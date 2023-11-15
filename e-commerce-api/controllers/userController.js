const models = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { use } = require("../routes/userRoute");

async function userRegister(req, res) {
    if(!req.body.email)return res.status(400).json({
        status: 0,
        message: "Email cannot be empty",
      });
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(async (result)=> {
        if(result) {
            res.status(400).json({
                status:0,
                message: "Email already Exist"
            })
        }else{
            let hashedPassword;
            if(req.body.password) {
                hashedPassword = await bcrypt.hash(req.body.password, 10);
            }
            
            let userData = {
                userName: req.body.userName,
                email: req.body.email,
                password : hashedPassword,
                dob: req.body.dob,
                profileImage: req.body.profileImage
            }
            
            models.User.create(userData).then((result)=>{
                res.status(201).json({
                    status: 1,
                    message: "user data registered successfullly",
                    user: result,
                    });
            }).catch((error)=>{
                res.status(500).json({
                    status: 0,
                    message: "something went wrong",
                    error: error,
                });
            })
        }
    })
}

async function generateAccessJwtToken(req, res, userData) {
    let accessJwtToken = jwt.sign(userData, process.env.ACCESSJWTTOKENKEY, {expiresIn: '15m'})
    return accessJwtToken
}

async function generateRefreshToken(req, res, userData) {
    let refreshToken = jwt.sign(userData, process.env.REFRESHTOKENKEY, {expiresIn: '30d'})
    return refreshToken
}

async function userLogin(req, res) {
    let userData = {
        email: req.body.email,
        password: req.body.password,
    };
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(async (result)=>{
        if(result) {
            if(await bcrypt.compare(req.body.password, result.dataValues.password)) {
                const accessJwtToken = await generateAccessJwtToken(req, res, userData)
                console.log(accessJwtToken)
                const refreshToken = await generateRefreshToken(req, res, userData) 
                console.log(refreshToken)
                let sendData = {
                    status: 1,
                    message: "User Login Successfull",
                    data: {
                        jwtToken: accessJwtToken,
                        refreshToken: refreshToken
                    }
                }
                res.status(200).send(sendData)
            }
            else{
                res.status(400).json({
                    status: 0,
                    message: "Bad request...credential Not Valid"
                });
            }
        } else {
            res.status(400).json({
                status: 0,
                message: "Bad request...credential Not Valid"
            });
        }
    }).catch((error)=>{
        res.status(500).json({
            status: 0,
            message: "credential Not Valid",
            error: error
        });
    })
}

module.exports = {
    userRegister,
    userLogin
}