const express = require("express")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()
const postRoute = require('./routes/postRoute.js')
const userRoute = require("./routes/userRoute.js")
const associationTestRoute = require("./routes/associationTestRoute.js")

app.use(bodyParser.json())

app.use('/post', postRoute)
app.use("/user", userRoute)
app.use("/association", associationTestRoute)

app.get('/', (req, res)=>{
  res.send("hello promil")
})

app.listen(process.env.PORT, ()=> console.log(`server is running at PORT: ${process.env.PORT}`))