const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload =  multer({ dest: 'uploads/' })
const {displayViewHomeEJS, uploadFileEJS, handleUploadForm} = require("../controllers/displayViewController.js")

router.get('/home', displayViewHomeEJS)
router.get('/uploadfile', uploadFileEJS)
router.post('/upload-form', upload.single('photoUpload'), handleUploadForm)

module.exports = router