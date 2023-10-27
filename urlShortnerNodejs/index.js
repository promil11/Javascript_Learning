const express = require("express")
const app = express()
const path = require("path")
const {connectDB} = require("./connection.js")
const urlRouter = require("./routers/urlRouter.js")
const viewPageRouter = require("./routers/viewPageRouter.js")
require('dotenv').config()

connectDB().then(()=> console.log("mongoDB connected")).catch((err)=> console.log("mongoDb not able to connect"))

app.use(express.urlencoded({extended: false}))
app.use('/url', urlRouter)
app.use("/display", viewPageRouter)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at ${process.env.PORT}`)
})