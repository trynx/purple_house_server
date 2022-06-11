const randomColor = require("randomcolor"); // import the script
const models = require("../models");
const Job = models.job;
const Candidates = models.candidate;

const percent = (num, total) => {
    return (num / total) * 100;
};

exports.getPositionsCandidates = async (req, res) => {
    try {
        const jobs = await Job.find({}).exec();
        const totalCandidates = (await Candidates.find({}).exec()).length;

        const positions = {};
        jobs.forEach((job) => {
            if (job.candidates?.length === 0) {
                return;
            }

            let jobPosition = job.position;

            const candidatesPercent = percent(
                job.candidates.length,
                totalCandidates
            );

            // For positions that have lower than 1% of candidates
            // add to 'Other' category
            if (candidatesPercent < 1) {
                jobPosition = "Other";
            }

            if (!positions[jobPosition]) {
                positions[jobPosition] = 0;
            }

            positions[jobPosition] += job.candidates.length;
        });

        const positionCandidates = [];

        const positionsArr = Object.keys(positions);
        for (const position of positionsArr) {
            const candidates = positions[position];

            positionCandidates.push({
                name: position,
                value: percent(candidates, totalCandidates),
                candidates,
                color: randomColor(),
            });
        }

        return res.status(200).send(positionCandidates);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
