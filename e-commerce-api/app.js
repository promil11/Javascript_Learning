const express = require("express")
const app = express() 
const bodyParser = require("body-parser")
require("dotenv").config() 
const userRoute = require("./routes/userRoute.js")
const customerRoute = require("./routes/customerRoute.js")

app.use(bodyParser.json())

app.use("/user", userRoute)
app.use("/customer", customerRoute)

app.get("/", (req, res)=>{ 
    res.send("hello promil")
}) 

app.listen(process.env.PORT, ()=> console.log(`server is running at port ${process.env.PORT}`))