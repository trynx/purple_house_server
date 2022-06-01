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
    // TODO: Search how to do a counter depend on the amount of
    // entries with the same position
    // candidates: {
    //     type: Number,
    //     required: true
    // }
    date_open: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Job = mongoose.model("Job", JobSchema);
