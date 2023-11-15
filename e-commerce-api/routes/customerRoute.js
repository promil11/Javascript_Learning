const express = require("express")
const router = express.Router()

const customerController = require("../controllers/customerController")

router.get("/customer-read/:id", customerController.readCustomerProfile)
router.get("/customer-update/:id", customerController.updateCustomerProfile)

module.exports = router