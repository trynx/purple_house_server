const { verifyToken } = require("../../middlewares/authJwt");
const express = require("express");
const router = express.Router();
// const fileType = require("file-type");
const multer = require("multer");
// Multer is required to process file uploads and make them available via
// req.files.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});
const {
    createCandidate,
    allCandidates,
    candidateResume,
} = require("../../controllers/candidate.controller");

router.post("/create", [verifyToken, upload.single("file")], createCandidate);

router.get("", [verifyToken], allCandidates);

router.post("/resume", [verifyToken], candidateResume);

module.exports = router;
