let mongoose = require("mongoose")

async function connectDB() {
   return mongoose.connect("mongodb+srv://promax11:promax11@cluster0.85oshhi.mongodb.net/app-1")
}
module.exports = { connectDB }