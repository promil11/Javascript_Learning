const express = require('express')
const app = express()
const userRouter = require("./routers/user.js")
const adminRouter = require("./routers/admin.js")
const {connectDB} = require("./connection.js")

//mongoDB connection->
connectDB().then(()  => console.log("database connected successfully")).catch((err)=> console.log(err))


//middlewares->
app.use(express.urlencoded({extended: false}))


app.use('/user', userRouter)

app.use('/admin', adminRouter)



app.listen(4001, ()=> console.log("server are running at port 4000"))
