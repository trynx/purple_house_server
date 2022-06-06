const { candidate: Candidate, job: Job } = require("../models");
const { upload } = require("../services/uploadS3");
const { download } = require("../services/downloadS3");

const isRequestValid = (req) => {
    return (
        Object.keys(req.body).length !== 0 &&
        !!req.body.name &&
        !!req.body.email &&
        !!req.body.phone &&
        !!req.body.currentJob &&
        !!req.body.position &&
        !!req.file
    );
};

exports.createCandidate = async (req, res) => {
    if (!isRequestValid(req)) {
        return res.status(400).send({ message: "Invalid request!" });
    }

    // Check that can't create a candidate which is already
    // subscribed to the same position
    try {
        const candidateEmail = await Candidate.find({
            email: req.body.email,
            position: req.body.position,
        }).exec();
        if (candidateEmail && candidateEmail.length > 0) {
            return res.status(500).send({
                message:
                    "Candidate with that email and position already exist!",
            });
        }
    } catch (err) {
        return res
            .status(400)
            .send({ message: "Couldn't verify candidate duplication." });
    }

    let resumeKey;
    try {
        resumeKey = await upload(req.file, "resumes");
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

    if (!resumeKey) {
        return res.status(500).send({ message: "Couldn't upload file." });
    }

    const candidate = new Candidate({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        currentJob: req.body.currentJob,
        position: req.body.position,
        resumeKey,
    });

    candidate.save(async (err, candidate) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        try {
            await Job.findOneAndUpdate(
                { _id: { $in: req.body.position } },
                { $push: { candidates: candidate._id } }
            ).exec();
        } catch (err) {
            return res.status(500).send({ message: err });
        }

        res.status(200).send({
            message: `Candidate was created successfully :)`,
        });
    });
};

exports.allCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find({}).populate("position").exec();
        res.status(200).send(candidates);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.candidateResume = async (req, res) => {
    if (Object.keys(req.body).length === 0 || !!!req.body.resumeKey) {
        return res.status(400).send({ message: "Invalid request!" });
    }

    download(req.body.resumeKey, res);
};
