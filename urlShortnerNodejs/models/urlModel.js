const mongoose = require("mongoose")

//create schema
const shortUrlSchema = new mongoose.Schema({
    shortUrlId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {type: Number}
    }]
}, {timestamps: true}
)

const UrlModel = mongoose.model("url", shortUrlSchema)

module.exports = UrlModel
