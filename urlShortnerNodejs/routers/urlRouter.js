const express = require("express")
const { handleGenerateShortUrl, handleAccessShortUrl, handleNumberOfVisit} = require("../controllers/urlController.js")
const router = express.Router()

router.post("/", handleGenerateShortUrl)
router.get("/:shortUrlId", handleAccessShortUrl)
router.get("/numberofvisit/:shortUrlId", handleNumberOfVisit)

module.exports = router