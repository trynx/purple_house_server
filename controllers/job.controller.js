const models = require("../models");
const Job = models.job;
const Candidate = models.candidate;

const isRequestValid = (req) => {
    return (
        Object.keys(req.body).length !== 0 &&
        !!req.body.position &&
        !!req.body.department &&
        !!req.body.office
    );
};

exports.createJob = (req, res) => {
    if (!isRequestValid(req)) {
        return res.status(400).send({ message: "Invalid request!" });
    }

    // TODO: Can add checker that can't create the same job twice(equal position, department and office)

    const job = new Job({
        position: req.body.position,
        department: req.body.department,
        office: req.body.office,
    });

    job.save((err, job) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        res.status(200).send({ message: "Job was created successfully :)" });
    });
};

exports.allJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).populate("candidates").exec();
        console.log({ jobs });
        res.status(200).send(jobs);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
