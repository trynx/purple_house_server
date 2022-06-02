const models = require("../models");

const User = models.user;

exports.checkUsernameDuplication = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, position) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (position) {
            return res.status(400).send({
                message: "Failed, username already exist!",
            });
        }

        next();
    });
};
