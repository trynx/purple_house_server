const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    office: {
        type: String,
        required: true,
    },
    date_open: {
        type: Date,
        default: Date.now,
    },
    candidates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
        },
    ],
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
