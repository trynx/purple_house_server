const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/index");
const User = db.user;

const isRequestValid = (req) => {
    return (
        Object.keys(req.body).length !== 0 &&
        !!req.body.username &&
        !!req.body.password
    );
};

exports.register = (req, res) => {
    if (!isRequestValid(req)) {
        res.status(400).send({ message: "Invalid request!" });
        return;
    }

    // TODO: Validate password sastify the conditions (over 8 letters, etc...)
    // TODO: Validate email sastify the conditions (regex that the email is valid)
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "User was registered successfully :)" });
    });
};

exports.signin = (req, res) => {
    if (!isRequestValid(req)) {
        res.status(400).send({ message: "Invalid request!" });
        return;
    }

    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isPasswordValid) {
            return res
                .status(401)
                .send({ accessToken: null, message: "Invalid Password." });
        }

        // @ts-ignore
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 10, // 24 hours
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            accessToken: token,
        });
    });
};
