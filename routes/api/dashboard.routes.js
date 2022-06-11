const express = require("express");
const {
    getPositionsCandidates,
} = require("../../controllers/dashboard.controller");
const { verifyToken } = require("../../middlewares/authJwt");
const router = express.Router();

router.get("/positions", [verifyToken], getPositionsCandidates);

module.exports = router;
