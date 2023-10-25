const express = require("express")
const app = express()
const userRouter  = require("./routes/user.js")
const {connectDB} = require("./connection.js")
let {checkEvenId} = require("./middlewares/index.js") 


//mongoDB connection->
connectDB().then(()=> console.log("mongoDB connected")).catch((err)=> console.log(err))

//middlewares->
app.use(express.urlencoded({extended: false}))
app.use(checkEvenId)

//routes->
app.use('/api/users', userRouter)

app.listen(8000, () => {
    console.log("server is running at port: 8000")
})