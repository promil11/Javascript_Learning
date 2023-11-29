const express = require("express")
const router = express.Router()
const delieveryController = require("../controllers/delieveryController.js")

router.get("/delievery-read-order", delieveryController.delieveryFetchOrder)
router.patch("/delievredOrdered", delieveryController.delievredOrdered)
router.patch("/verify-otp", delieveryController.verifyOtp)


module.exports = router