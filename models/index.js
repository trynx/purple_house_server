// Save all the mongoDB models in the db object
const db = {};
db.job = require("./job.model");
db.user = require("./user.model");

module.exports = db;
