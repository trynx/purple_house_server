const db = require("../models/index");

const User = db.user;

exports.checkUsernameDuplication = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, position) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (position) {
            res.status(400).send({
                message: "Failed, username already exist!",
            });
            return;
        }

        next();
    });
};
