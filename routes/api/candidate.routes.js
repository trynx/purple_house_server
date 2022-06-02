const { verifyToken } = require("../../middlewares/authJwt");
const express = require("express");
const router = express.Router();
const {
    createCandidate,
    allCandidates,
} = require("../../controllers/candidate.controller");

router.post("/create", [verifyToken], createCandidate);

router.get("", [verifyToken], allCandidates);

module.exports = router;
