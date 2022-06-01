const { verifyToken } = require("../../middlewares/authJwt");
const express = require("express");
const router = express.Router();

// Load Job model
const Job = require("../../models/job.model");

// @route GET api/jobs/test
// @description test job route
// @access Public
router.get("/test", (req, res) => res.send("job route testing :)"));

// @route GET api/jobs
// @description get all jobs
// @access Public
router.get("/", async (req, res) => {
    res.json({ groot: "I am Groot" });
});

router.get("/jobs", [verifyToken], async (req, res) => {
    // @ts-ignore
    const { result, err } = await Job.find();

    if (err) {
        res.status(404).json({ noJobsFound: "No Jobs found" });
        return;
    }

    res.json({ result });
});

// TODO Continue with the rest of the routers...
// https://blog.logrocket.com/mern-stack-tutorial/

module.exports = router;
