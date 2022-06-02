const { verifyToken } = require("../../middlewares/authJwt");
const express = require("express");
const router = express.Router();

const { allJobs, createJob } = require("../../controllers/job.controller");

router.get("/test", (req, res) => res.send("job route testing :)"));

router.get("", [verifyToken], allJobs);

router.post("/create", [verifyToken], createJob);

// TODO Continue with the rest of the routers...
// https://blog.logrocket.com/mern-stack-tutorial/

module.exports = router;
