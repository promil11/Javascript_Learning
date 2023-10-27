const shortId = require("shortid")
const UrlModel = require("../models/urlModel.js")

async function handleGenerateShortUrl(req, res) {
    let bodyData = req.body
    if(!bodyData.url) return res.status(400).send("Url Must Required")
    let createShortId = shortId.generate()
    await UrlModel.create({
        shortUrlId: createShortId,
        redirectUrl: bodyData.url,
        visitHistory: []
    })
    // res.status(201).send("url shorten successfully")
    res.render("home", {
        UrlId: createShortId
    })
    
}

async function handleAccessShortUrl(req, res) {
    let shortUrlId = req.params.shortUrlId
    let entry = await UrlModel.findOneAndUpdate({shortUrlId}, {
        $push: {
            visitHistory : {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl)
}

async function handleNumberOfVisit(req, res) {
    let shortUrlId = req.params.shortUrlId
    let entry = await UrlModel.findOne({shortUrlId})
    res.status(200).send({"number of visited": entry.visitHistory.length})
}

module.exports = {
    handleGenerateShortUrl,
    handleAccessShortUrl,
    handleNumberOfVisit
}