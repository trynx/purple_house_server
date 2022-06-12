const models = require("../models");
const Job = models.job;
const Candidates = models.candidate;

const percent = (num, total) => {
    return (num / total) * 100;
};

const appendPositionData = (prevPosition, newPostition, totalCandidates) => {
    // Update position data by it's new amount of candidates
    const { candidates: prevCandidates } = prevPosition;
    const { candidates: newCandidates } = newPostition;

    const newTotalCandidates = prevCandidates + newCandidates;
    const newCandidatesPercent = percent(newTotalCandidates, totalCandidates);

    // Also save the previous color, which is the one to be always used
    return {
        ...prevPosition,
        candidates: newTotalCandidates,
        value: newCandidatesPercent,
    };
};

exports.getPositionsCandidates = async (req, res) => {
    try {
        const jobs = await Job.find({}).exec();
        const totalCandidates = (await Candidates.find({}).exec()).length;

        const positionCandidates = [];

        const positionsIndex = {};
        jobs.forEach((job) => {
            if (job.candidates?.length === 0) {
                return;
            }

            let jobPosition = job.position;
            let jobColor = job.color;
            const candidatesAmount = job.candidates.length;

            const candidatesPercent = percent(
                candidatesAmount,
                totalCandidates
            );

            // For positions that have lower than 1% of candidates
            // add to 'Other' category
            if (candidatesPercent < 1) {
                jobPosition = "Other";
                jobColor = "#6659e0";
            }

            const positionData = {
                name: jobPosition,
                value: percent(candidatesAmount, totalCandidates),
                candidates: candidatesAmount,
                color: jobColor,
            };

            // Already have the position in the array
            if (positionsIndex[jobPosition] !== undefined) {
                const positionIndex = positionsIndex[jobPosition];
                const prevPositionData = positionCandidates[positionIndex];
                const updatedPositionData = appendPositionData(
                    prevPositionData,
                    positionData,
                    totalCandidates
                );

                positionCandidates[positionIndex] = updatedPositionData;
                return;
            }

            // Save the index of the job position to
            positionsIndex[jobPosition] =
                positionCandidates.push(positionData) - 1;
        });

        return res.status(200).send(positionCandidates);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
