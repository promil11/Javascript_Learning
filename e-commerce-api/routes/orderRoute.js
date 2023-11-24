const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController.js")


router.post("/customer-order-create", orderController.createCustomerOrder)
router.get("/customer-order-fetch/:id", orderController.fetchCustomerOrder)

module.exports = router