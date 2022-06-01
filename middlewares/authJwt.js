const config = require("config");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    // @ts-ignore
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .send({ message: "Unauthorized! Access token was expired!" });
        }

        req.userId = decoded.id;
        next();
    });
};

// module.exports = verifyToken;
