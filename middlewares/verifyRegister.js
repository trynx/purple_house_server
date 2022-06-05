const models = require("../models");

const User = models.user;

exports.checkUsernameDuplication = (req, res, next) => {
    User.findOne({
        email: req.body.email,
    }).exec((err, position) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (position) {
            return res.status(400).send({
                message: "Failed, user already exist!",
            });
        }

        next();
    });
};
