const { verifyToken } = require("../../middlewares/authJwt");
const express = require("express");
const router = express.Router();
// const fileType = require("file-type");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
    createCandidate,
    allCandidates,
    candidateResume,
} = require("../../controllers/candidate.controller");

router.post("/create", [verifyToken, upload.single("file")], createCandidate);

router.get("", [verifyToken], allCandidates);

router.post("/resume", [verifyToken], candidateResume);

module.exports = router;
