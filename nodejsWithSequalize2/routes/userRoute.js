const express = require("express")
const router = express.Router()
const {userLoginAuth} =require("../middleware/index.js")
const {uploadImage} = require("../controllers/imageController.js")
const imageUploader = require("../helpers/image-uploader.js")
const userController = require("../controllers/userController")


router.post("/register", userController.userRegister)
router.post("/login", userController.userLogin)
router.post("/forgot-password", userController.forgotPassword)
router.post("/resetpassword/:token", userController.userPostResetPassword)
router.post("/change-password", userLoginAuth, userController.userChangePassword)
router.post("/image-upload", imageUploader.upload.single("image",), uploadImage)

module.exports = router