const {User} = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

async function userRegister(req, res) {
    let bodyData = req.body
    if(bodyData.first_name && bodyData.last_name && bodyData.email && bodyData.password && bodyData.gender){
        let hashedPassword = await bcrypt.hash(bodyData.password, 10)
        await User.create({
            first_name: bodyData.first_name,
            last_name: bodyData.last_name,
            email: bodyData.email,
            password: hashedPassword,
            gender: bodyData.gender,
            accessible: true, 
        })
        res.status(201).send("User Data Registered Successfully")
    }else{
        return res.send("need to filled full details")
    }
}

function generateJwtToken(req, res) {
    let bodyData = req.body
    let user = {
        email: bodyData.email,
        password: bodyData.password
    }
    let jwtAccessToken = jwt.sign(user, process.env.SECRET, { expiresIn: 300000 })
    return jwtAccessToken
}

function generateRefreshToken(req, res) {
    let bodyData = req.body
    let user = {
        email: bodyData.email,
        password: bodyData.password
    }
    let refreshToken = jwt.sign({ user }, process.env.SECRETREFRESHKEY, { expiresIn: '30d' });
    return refreshToken
}

async function userLogin(req, res) {
    let bodyData = req.body
    let data = await User.findOne({email: bodyData.email})
    if(data.email && !data.password) return res.status(404).send("credentials are incomplete")
    if(data == null) return res.status(404).send("user are not exist/registered")
    if(data.accessible == false) return res.status(401).send("user are not able to login more than 3 times")
    if(await bcrypt.compare(bodyData.password, data.password)){
        // console.log("password matched")
        data.limit = 0
        data.save()
        let refreshToken =  generateRefreshToken(req, res)
        let jwtAccessToken = generateJwtToken(req, res)
        // console.log(refreshToken)
        // return res.status(200).json({"message":"user loggedIn successfully", "jwt-token": jwtAccessToken, "refresh-token": refreshToken})
        res
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', jwtAccessToken)
        .status(200).
        json({"status":1,"message":"user loggedIn successfully", "jwt-token": jwtAccessToken, "refresh-token": refreshToken})
    }
    else{
        // console.log("password not matched")
        console.log(data.limit)
        if(data.limit >=3){
            data.accessible = false;
        }
        data.limit =  data.limit + 1;
        data.save()
        res.status(401).send("user unauthorization! credential incorrect")
    } 
}


async function adminGiveAccess(req, res) {
    let bodyData = req.body
    let userExist = await User.findOne({email: bodyData.email})
    if(userExist == null)return res.status(404).send("user are not registered")
    userExist.accessible = true
    userExist.limit = 0
    userExist.save()
    res.send("admin give authority to login")
}


async function userForgotPassword(req, res) {
//     let bodyData = req.body
//     let userExist = await User.findOne({email: bodyData.email})
//     if(userExist == null)return res.status(404).send("user are not registered")
//     let hashedPassword = bcrypt.hash(bodyData.password, 10)
//     userExist.password = hashedPassword
//     userExist.save()
//     let user = {
//         email: userExist.email,
//         password: userExist.password
//     }
//     let jwtAccessToken = jwt.sign(user, process.env.SECRET, { expiresIn: 300000 })
//     console.log(jwtAccessToken)
//     req.headers.jwttoken = jwtAccessToken
//     res.status(200).send("password updated successfully")
}


async function userChangePassword(req, res) {
    let bodyData = req.body
    let userExist = await User.findOne({email: bodyData.email})
    if(userExist == null)return res.status(404).send("user are not registered")
    
    let hashedPassword = await bcrypt.hash(bodyData.password, 10)
    userExist.password = hashedPassword
    userExist.save()
    res.status(200).send("password changed successfully")
}


module.exports = {
    userRegister,
    userLogin,
    adminGiveAccess,
    userForgotPassword,
    userChangePassword,
}