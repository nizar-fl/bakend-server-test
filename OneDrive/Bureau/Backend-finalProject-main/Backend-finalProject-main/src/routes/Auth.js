const express = require("express");
const { login, signUp,changePassword } = require("../controllers/authController");
const router = express.Router();
const validatePassword = require("../middlewares/isPasswordAvailable")
router.post("/login", login);

router.post("/signup",validatePassword, signUp);// the request needs in its body a firstName and a LastName and unique email and a password
router.put("/changePassword", validatePassword,changePassword)

module.exports = router;