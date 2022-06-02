const { candidate: Candidate } = require("../models");

const isRequestValid = (req) => {
    return (
        Object.keys(req.body).length !== 0 &&
        !!req.body.name &&
        !!req.body.email &&
        !!req.body.phone &&
        !!req.body.currentJob &&
        !!req.body.position
    );
};

exports.createCandidate = (req, res) => {
    if (!isRequestValid(req)) {
        return res.status(400).send({ message: "Invalid request!" });
    }

    // TODO: Can add a check that can't create a candidate which is already subscribed to the same position

    const candidate = new Candidate({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        currentJob: req.body.currentJob,
        position: req.body.position,
    });

    candidate.save((err, candidate) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        res.status(200).send({
            message: `Candidate was created successfully :)`,
        });
    });
};

exports.allCandidates = (req, res) => {
    Candidate.find({}, (err, candidates) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        res.status(200).send(candidates);
    });
};
