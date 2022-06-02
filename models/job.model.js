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
    candidates: {
        type: Number,
        default: 0,
    },
    date_open: {
        type: Date,
        default: Date.now,
    },
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
