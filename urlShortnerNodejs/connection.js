const mongoose = require("mongoose")

async function connectDB() {
    return mongoose.connect("mongodb+srv://promax11:promax11@cluster0.dw48lvn.mongodb.net/")
}

module.exports = {connectDB}