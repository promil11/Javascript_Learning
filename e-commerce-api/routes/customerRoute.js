const express = require("express")
const router = express.Router()

const customerController = require("../controllers/customerController")

router.get("/customer-read/:id", customerController.readCustomerProfile)
router.patch("/customer-update-img/:id", customerController.updateCustomerProfileImg)
router.patch("/customer-update-add/:id", customerController.updateCustomerProfileAddress)
router.post("/customer-create", customerController.updateCustomerProfileAddress)
router.delete("/customer-delete/:id", customerController.deleteCustomerProfile)
router.post("/customer-order-create", customerController.createCustomerOrder)
router.get("/customer-order-fetch/:id", customerController.fetchCustomerOrder)

module.exports = router