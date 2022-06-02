const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
};
// Routes
const jobs = require("./routes/api/job.routes");
const auth = require("./routes/api/auth.routes");
const candidate = require("./routes/api/candidate.routes");

const app = express();

app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//#region Previous things - keep for now if need something
// const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });

// App setups
// app.use(cors());
// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
// app.use(express.json());
// app.use(require("./routes/record"));
// TODO: For auth
// app.use(require('../route/auth-router'));

// Get driver connection
// const dbo = require("./db/conn");

// When the server start, do a database connection
// dbo.connectToServer((err) => {
//     if (err) console.error(err);
// });
//#endregion Previous things - keep for now if need something

// Connect to DB
connectDB();

app.get("/", (req, res) => res.send("I am Groot or not..."));

// Add Routes
app.use("/api/jobs", jobs);
app.use("/api/auth", auth);
app.use("/api/candidate", candidate);

const port = process.env.PORT || 8088;

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});
