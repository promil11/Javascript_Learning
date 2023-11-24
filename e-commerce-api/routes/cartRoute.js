const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController.js")

router.post("/create-cart", cartController.addToCart)
router.get("/get-cart", cartController.getFromCart)
router.delete("/delete-cart", cartController.deleteToCart)

module.exports = router