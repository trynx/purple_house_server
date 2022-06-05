const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
};

// Routes
const job = require("./routes/api/job.routes");
const auth = require("./routes/api/auth.routes");
const candidate = require("./routes/api/candidate.routes");

const app = express();

// Add cors to be able to speak between the front and back
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Don't connect to DB when in test, as it will happen in the test cases
if (process.env.NODE_ENV !== "test") {
    // Connect to DB
    connectDB();
}

app.get("/", (req, res) => res.send("I am Groot or not..."));

// Add Routes
app.use("/api/job", job);
app.use("/api/auth", auth);
app.use("/api/candidate", candidate);

const port = process.env.PORT || 8088;

const server = app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});

module.exports = { app, server };
