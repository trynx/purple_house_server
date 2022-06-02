const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    currentJob: {
        type: String,
        required: true,
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    },
});

const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;
