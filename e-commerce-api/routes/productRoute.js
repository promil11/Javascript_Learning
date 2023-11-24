const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController.js")

router.post("/create-product", productController.createProduct)
router.get("/fetch-product/:id", productController.fetchProduct)
router.get("/fetch-product", productController.fetchProduct)
router.delete("/delete-product/:id", productController.deleteProduct)
router.patch("/update-product/:id", productController.updateProduct)
router.post("/create-review-product", productController.createReviewProduct)
router.get("/fetch-review-product", productController.fetchReviewProduct)
router.get("/fetch-comment-product", productController.fetchCommentProduct)
router.post("/create-comment-product", productController.createCommentProduct)
router.post("/filteration-product", productController.filterationProduct)

module.exports = router