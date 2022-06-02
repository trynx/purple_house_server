const express = require("express");
const {
    checkUsernameDuplication,
} = require("../../middlewares/verifyRegister");
const {
    register,
    signin,
    refreshToken,
} = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/register", [checkUsernameDuplication], register);

router.post("/signin", signin);

router.post("/refreshtoken", refreshToken);

module.exports = router;
