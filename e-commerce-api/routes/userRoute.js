const express = require("express")
const router = express.Router()
const {userLoginAuth} =require("../middleware/index.js")
const userController = require("../controllers/userController.js")

router.post("/register", userController.userRegister)
router.post("/login", userController.userLogin)
router.post("/user-forgot-password", userController.UserForgotPassword)
router.post("/user-reset-password/:token", userController.userResetPassword)
router.post("/user-change-password", userLoginAuth, userController.userChangePassword)

module.exports = router