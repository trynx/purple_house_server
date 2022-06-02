const config = require("./../config/auth.config");
const jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res
            .status(401)
            .send({ message: "Unauthorized! Access token expired!" });
    }

    return res.status(401).send({ message: "Unauthorized!" });
};

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }

        req.userId = decoded.id;
        next();
    });
};
