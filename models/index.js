// Save all the mongoDB models
const models = {};
models.job = require("./job.model");
models.user = require("./user.model");
models.refreshToken = require("./refreshToken.model");
models.candidate = require("./candidate.model");

module.exports = models;
