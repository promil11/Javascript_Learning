const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/categoryController.js")


router.post("/create-category", categoryController.createCategory)
router.get("/read-parent-category", categoryController.readParentCategory)
router.get("/read-child-category-slug/:slug", categoryController.readChildCategorySlug)
router.delete("/delete-category/:id", categoryController.deleteCategory)
router.patch("/update-category/:id", categoryController.updateCategoryId)


module.exports = router