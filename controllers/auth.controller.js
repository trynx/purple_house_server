const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { user: User, refreshToken: RefreshToken } = db;

const isRequestValid = (req) => {
    return (
        Object.keys(req.body).length !== 0 &&
        !!req.body.username &&
        !!req.body.password
    );
};

const createToken = (userId) => {
    return jwt.sign({ id: userId }, config.secret, {
        expiresIn: config.jwtExpiration,
    });
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
    }).exec(async (err, user) => {
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

        const token = createToken(user.id);

        // @ts-ignore custom statics function - JS intellisence can't recognize it
        const refreshToken = await RefreshToken.createToken(user);

        res.status(200).send({
            id: user._id,
            username: user.username,
            accessToken: token,
            refreshToken,
        });
    });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });
        if (!refreshToken) {
            return res
                .status(403)
                .json({ message: "Refresh token is not in database!" });
        }

        // @ts-ignore custom statics function - JS intellisence can't recognize it
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, {
                useFindAndModify: false,
            }).exec();

            return res.status(403).json({
                messsage:
                    "Refresh token was expired. Please make a new signin request",
            });
        }

        let newAccessToken = createToken(refreshToken.user._id);

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
