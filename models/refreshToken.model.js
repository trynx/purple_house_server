const mongoose = require("mongoose");
const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expiryDate: {
        type: Date,
    },
});

RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    // @ts-ignore - As it's in an function and not arrow-function `this` will
    // refer to the current instance and won't be lost.
    // Build the refresh token object
    let _object = new this({
        token: _token,
        user: user._id,
        expiryDate: expiredAt.getTime(),
    });

    // Create(save) the refresh token in the collection
    let refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;
