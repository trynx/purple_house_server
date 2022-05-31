const express = require("express");
const router = express.Router();

// Load Job model
const Job = require("../../models/Job");

// @route GET api/jobs/test
// @description test job route
// @access Public
router.get("/test", (req, res) => res.send("job route testing :)"));

// @route GET api/jobs
// @description get all jobs
// @access Public
router.get("/", async (req, res) => {
    const { result, err } = await Job.find();

    if (err) {
        res.status(404).json({ noJobsFound: "No Jobs found" });
        return;
    }

    res.json({ ...result, groot: "I am Groot" });
});

// TODO Continue with the rest of the routers...
// https://blog.logrocket.com/mern-stack-tutorial/

module.exports = router;
