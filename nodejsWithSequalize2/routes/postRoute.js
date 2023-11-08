const express = require("express")
const postsController = require("../controllers/postController.js")

const router = express.Router()

router.post('/insert-post', postsController.insertData)
router.get('/fetch-post', postsController.fetchAllPost)
router.get('/fetch-post/:id', postsController.fetchPostById)
router.patch("/update-post/:id", postsController.updatePostById)
router.delete("/delete-post/:id", postsController.deletePostById)
router.get("/scope", postsController.userScope)

module.exports = router