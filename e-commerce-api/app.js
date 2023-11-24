const express = require("express")
const app = express() 
const bodyParser = require("body-parser")
require("dotenv").config() 
const userRoute = require("./routes/userRoute.js")
const customerRoute = require("./routes/customerRoute.js")
const categoryRoute = require("./routes/categoryRoute.js")
const productRoute = require("./routes/productRoute.js")
const cartRoute = require("./routes/cartRoute.js")
const orderRoute = require("./routes/orderRoute.js")
const wishListRoute = require("./routes/wishListRoute")

app.use(bodyParser.json())

app.use("/user", userRoute)
app.use("/customer", customerRoute)
app.use("/category", categoryRoute)
app.use("/product", productRoute)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)
app.use("/wish-List", wishListRoute)

app.get("/", (req, res)=>{ 
    res.send("hello promil")
}) 

app.listen(process.env.PORT, ()=> console.log(`server is running at port ${process.env.PORT}`))