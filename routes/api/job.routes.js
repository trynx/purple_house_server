const { verifyToken } = require("../../middlewares/authJwt");
const express = require("express");
const router = express.Router();

const { allJobs, createJob } = require("../../controllers/job.controller");

router.get("/test", (req, res) => res.send("job route testing :)"));

router.get("", [verifyToken], allJobs);

router.post("/create", [verifyToken], createJob);

module.exports = router;
