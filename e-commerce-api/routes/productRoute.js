const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController.js")

router.post("/create-product", productController.createProduct)
router.get("/fetch-product/:id", productController.fetchProduct)
router.get("/fetch-product", productController.fetchProduct)
router.delete("/delete-product/:id", productController.deleteProduct)
router.patch("/update-product/:id", productController.updateProduct)


module.exports = router