const express = require("express")
const router = express.Router()
const {userLoginAuth} = require("../middlewares/index.js")
const {userRegister, userLogin, userForgotPassword, userChangePassword} = require("../controllers/user.js")

//user registration
router.post('/register', userRegister)

//user login
router.post("/login", userLogin)

//forgot Password
router.post("/forgotpassword", userForgotPassword)

//change password
router.post('/changepassword', userLoginAuth, userChangePassword)

module.exports = router