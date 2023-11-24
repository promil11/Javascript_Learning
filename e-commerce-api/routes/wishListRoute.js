const express = require("express")
const router = express.Router()
const wishListController = require("../controllers/wishListController.js")

router.post("/wishList-create", wishListController.addToWishList)
router.get("/wishList-fetch", wishListController.getFromWishList)
router.delete("/wishList-delete", wishListController.deleteToWishList)

module.exports = router