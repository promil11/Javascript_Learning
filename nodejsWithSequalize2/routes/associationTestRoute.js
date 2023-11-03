const express = require("express")
const associationController = require("../controllers/associationController")

const router = express.Router()

router.get('/', associationController.test)

module.exports = router