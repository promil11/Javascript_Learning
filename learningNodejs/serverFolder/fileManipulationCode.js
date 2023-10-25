// const http = require("http")
// const fs = require("fs")
// const url = require("url")
// const express = require('express')  // when you import express then no need to require express bz it access it internally

// const app = express()

// function handler(req, res) {
//     if(req.url === '/favicon.ico')return res.end()
//     let log = `${Date.now()}, request coming in my site in path ,${req.method} ${req.url}\n`
//     fs.appendFile("./test.txt",log, (err, data)=>{
//         console.log("request is received")
//         if(err) {
//             return res.end("404 Not Found")
//         }
//     })
//     // res.end("hello from server, welcome to my site")
//     // console.log(url.parse(req.url))
    
//     let returnParsedUrl = url.parse(req.url, true)
//     console.log(returnParsedUrl)
//     switch(returnParsedUrl.pathname) {
//         case '/' : 
//         if(req.method === 'GET') res.end(`welcome to homepage ${returnParsedUrl.query.name}`);
//         else if(req.method === 'POST')res.end("signup successfully")         ////but the problem is we have main five method and if we apply all five method in each url then how lengthy and code will be mess up therefore express come into picture 
//         break;
//         case '/about' : res.end("welcome to aboutpage"); break;
//         case '/contact' : res.end("welcome to contactpage"); break;
//         default : res.end("404 Not Found")
//     }
// }
// const myServer = http.createServer(handler)

// myServer.listen(8000, ()=>{
//     console.log("server is running...")
// })


// function handler(req, res) {
//     if(req.url === '/favicon.ico')return res.end()
//     let log = `${Date.now()}, request coming in my site in path ,${req.method} ${req.url}\n`
//     fs.appendFile("./test.txt",log, (err, data)=>{
//         console.log("request is received")
//         if(err) {
//             return res.end("404 Not Found")
//         }
//     })
//     // res.end("hello from server, welcome to my site")
//     // console.log(url.parse(req.url))
    
//     let returnParsedUrl = url.parse(req.url, true)
//     console.log(returnParsedUrl)
//     switch(returnParsedUrl.pathname) {
//         case '/' : 
//         if(req.method === 'GET') res.end(`welcome to homepage ${returnParsedUrl.query.name}`);
//         else if(req.method === 'POST')res.end("signup successfully")         ////but the problem is we have main five method and if we apply all five method in each url then how lengthy and code will be mess up therefore express come into picture 
//         break;
//         case '/about' : res.end("welcome to aboutpage"); break;
//         case '/contact' : res.end("welcome to contactpage"); break;
//         default : res.end("404 Not Found")
//     }
// }

// app.get('/',(req,res)=>{
//     res.end(`homePage  ${req.query.name}`)
// })

// app.get('/about', (req,res)=>{
//     res.send({page:"about page"})
    // res.end({page:"about page"})//error
// })

// const myServer = http.createServer(app)

// myServer.listen(8000, ()=>{
//     console.log("server is running...")
// })

// app.listen(8000, ()=>{
//         console.log("server is running again...")
// })


const express = require("express")
const app = express()
const userRouter  = require("./routes/user.js")
const {connectDB} = require("./connection.js")
let {checkEvenId} = require("./middlewares/index.js")  //custom middleware ko fetch kiya dusre file se

///custom middleware
// app.use(checkEvenId)  //isko userdata require hone se phle likho verna ye pure number dega but apn ko even id chahiye  
// to ye middleware kya kregea ye phle hi fake_data.json file me jo bhi odd id valle h usko remove kr dega aur file ko update
//  kr dega to jb niche valli line usko require nkregi to usko updated deta milega

// const usersData = require("./fake_data.json")

// RESTFULL API
//  ----------------------built-in middleware
app.use(express.urlencoded({extended: false}))
app.use(checkEvenId)
// //  ----------------------custom middleware
// app.use((req, res, next)=>{
//     console.log("middleWare1")
//     req.myName = "promil"  //agr ek bhi middleware me kuch bhi property me change kri to vo through the code acccessible hoga
//     next()
// })


// app.use((req, res, next)=>{  //custom middlEwARE
//     console.log("middleWare2")
//     console.log(req.myName)
//     next()
//     // res.send("tata byeeee middleware reject the request") //error  Cannot set headers after they are sent to the client
// })

// ---------------------------------------------------------

//mongoDB connection->
connectDB().then(()=> console.log("mongoDB connected")).catch((err)=> console.log(err))


app.use('/api/users', userRouter)
// app.get('/api/users', async(req,res) => {
//     let allusers = await User.find({})
//     console.log(req.myName)
//     res.json(allusers)
// })

// app.get('/users',async (req, res)=>{
//     let allusers = await User.find({})
//     console.log(allusers)
//     let data = `
//         <ul>
//             ${allusers.map((item)=> `<li>${item.first_name}</li>`).join("")}
//         </ul>
//     `;
//     res.send(data)
// })

// app.get('/api/users/:id', async(req, res)=>{
//     // let idVal = req.params.id-1
//     // console.log(typeof idVal)
//     // res.send(usersData[idVal])
//     let id = req.params.id
//     let userDataId = await User.findById(id)
//     console.log(userDataId)
//     res.send(userDataId)
// })

// app.post('/api/users', async (req,res)=>{
//     let bodyData = req.body
//     // console.log(bodyData) //req.body direct kaam nhi krti apn ko middleware ka use krna pdega (express.urlencoded({extended: false}))
//     // usersData.push({id: usersData.length+1,...bodyData})
//     // fs.writeFile("./fake_data.json", JSON.stringify(usersData), (err, data)=>{
//     //     console.log("user data add successfully")
//     // })
//     // console.log(bodyData)
//     const result = await User.create({
//         first_name: bodyData.first_name,
//         last_name: bodyData.last_name,
//         email: bodyData.email,
//         jobTitle: bodyData.jobTitle,
//         gender: bodyData.gender
//     })
//     console.log(result)
//     res.status(201).json("successfully created user")
// })

// app.patch('/api/users/:id', async(req,res)=>{
//     let patchIndex  =  req.params.id
//     let bodyData = req.body
//     let modifyData = await User.findByIdAndUpdate(patchIndex, bodyData)
//     let objArray = Object.keys(bodyData)
//     objArray.map((item)=>{
//         // console.log(bodyData[item])
//         modifyData[item] = bodyData[item]
//     })
//     // fs.writeFile("./fake_data.json", JSON.stringify(usersData), (err, data)=>{
//     //     console.log("data modified successfully")
//     // })
//     //res.json(usersData)
//     res.json(modifyData)
// })

// app.delete('/api/users/:id',async (req,res)=>{
//     // let indexDelete = req.params.id-1
//     // usersData.splice(indexDelete,1)
//     // fs.writeFile("./fake_data.json", JSON.stringify(usersData), (err, data)=>{
//     //     console.log("data deleted successfully")
//     // })
//     // res.json(usersData)
//     let id = req.params.id
//     await User.findByIdAndDelete(id)
//     res.json("successfully deleted")
// })


// ab yha 3 route same dikh rhe h so for shorthen we can also write this as:

// app.route('/api/users/:id')
// .get((req, res)=>{
//     let idVal = req.params.id-1
//     console.log(typeof idVal)
//     res.send(usersData[idVal])
// })
// .patch((req,res)=>{
//     res.json({status: "pending"})
// })
// .delete((req,res)=>{
//     res.json({status: "pending"})
// })


app.listen(8000, () => {
    console.log("server is running at port: 8000")
})