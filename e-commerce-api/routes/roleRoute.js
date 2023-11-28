const express = require("express")
const router = express.Router()
const roleController = require("../controllers/roleController.js")

router.get("/fetch-role", roleController.getFromRole)

module.exports = router