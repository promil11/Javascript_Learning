const models = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const {jwtDecode} = require("jwt-decode");

async function userRegister(req, res) {
    if(!req?.body.email)return res.status(400).json({
        status: 0,
        message: "Email cannot be empty",
      });
    models.User.findOne({
        where: {
            email: req?.body.email
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
                hashedPassword = await bcrypt.hash(req?.body.password, 10);
            }
            
            let userData = {
                userName: req?.body.userName,
                email: req?.body.email,
                password : hashedPassword,
                dob: req?.body.dob,
                profileImage: req?.body.profileImage
            }
            
            models.User.create(userData).then((result)=>{
                try{
                    let {roleId} = req?.body
                    models.UserRole.create({roleId: roleId, userId: result.id})
                    models.PhoneNumber.bulkCreate([
                        { userId: result.id, phoneNumber: req?.body.phoneNumber1},
                        { userId: result.id, phoneNumber: req?.body.phoneNumber2}
                      ]).then((result)=>{
                        res.status(201).json({
                            status: 1,
                            message: "user data registered successfullly",
                            user: result,
                        });
                      }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong...credential wrong",
                            error: error,
                        });
                    })
                } catch(error) {
                    res.status(400).json({
                        status: 0,
                        message: "something went wrong...credential wrong",
                        error: error,
                    });
                }  
            })
        }  
    }).catch((error)=>{
        res.status(400).json({
            status: 0,
            message: "something went wrong...credential wrong",
            error: error,
        });
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
                let data = await models.UserRole.findOne({
                    where: {
                        userId: result.id
                    }
                })
                if(!data[0]){
                    userData["id"] = result.id
                    userData["roleId"] = data.roleId
                    console.log(userData)
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
                } else{
                    res.status(400).json({
                        status: 0,
                        message: "Bad request...credential Not Valid"
                    });
                }
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

async function UserForgotPassword(req, res){
    models.User.findOne({where: {email: req.body.email}}).then(async (result)=>{
        if(result) {
          let userData = {
            email: req.body.email,
            id: result.dataValues.id
          }
          console.log(userData, result.dataValues.password)
            let secretKeyMail = process.env.ACCESSJWTTOKENKEY + result.dataValues.password
            let tokenGenerate = jwt.sign(userData, secretKeyMail, {expiresIn: "10m"})
            let linkGenerate = `http://localhost:3000/user/reset-forgot-password/${tokenGenerate}`;
            console.log(tokenGenerate)
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD,
                },
              });
            
              let mailOptions = {
                from: {
                  name: "one-time-password reset link",
                  address: process.env.EMAIL,
                },
                to: ["19bit048@ietdavv.edu.in"],
                subject: "reset password",
                text: "",
                html: `<p>this is your one-time-reset link: ${linkGenerate}</p>`,
              };
            
              transporter
                .sendMail(mailOptions)
                .then(() => {
                  return res.status(201).json({ msg: "you should receive email" });
                })
                .catch((error) => {
                  return res.status(500).json({ error });
                });
        } else {
            res.status(400).json({
                status: 0,
                message: "Credential Not Valid"
            })
        }
    }).catch((error)=>{
        res.status(400).json({
            status: 0,
            message: "Credential Not Valid",
            error: error
        })
})
}

async function userResetPassword(req, res) {
  let token = req.params.token
  let decodedToken = jwtDecode(token)
  models.User.findOne({where: {email: decodedToken.email}}).then(async (result)=>{
    console.log(result)
    if(result){
      let secretKeyMail = process.env.SECRET + result.dataValues.password
      let verifyToken = jwt.verify(token, secretKeyMail)
      console.log("user token verified")
      if(verifyToken){
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        models.User.update({password : hashedPassword}, {where: {id: result.dataValues.id}}).then((result)=>{
          if(!result[0])return res.status(400).send("Bad Request")
            res.status(200).json({
                status:1,
                message:"password update successfully",
                post: result
            })
        }).catch((error)=>{
            res.status(500).json({
                status:0,
                message:"password is not updated",
                error: error
            })
        })
      } else {
        res.status(400).json({
          status: 0,
          message: "Credential Not Valid",
        })
      }
    }
     else {
      res.status(400).json({
        status: 0,
        message: "Credential Not Valid",
    })
    }
  }).catch((error)=>{
    res.status(400).json({
      status: 0,
      message: "Credential Not Valid",
      error: error
  })
  })
}

async function userChangePassword(req, res) {
  let hashedPassword = await bcrypt.hash(req.body.password, 10)
  let token = req.headers["jwt_token"]
  let decodedToken = jwtDecode(token)

  models.User.update({password : hashedPassword}, {where: {email: decodedToken.email}}).then((result)=>{
    if(!result[0])return res.status(400).send("Bad Request")
      res.status(200).json({
          status:1,
          message:"password update successfully",
          post: result
      })
  }).catch((error)=>{
      res.status(500).json({
          status:0,
          message:"password is not updated",
          error: error
      })
  })
}

module.exports = {
    userRegister,
    userLogin,
    UserForgotPassword,
    userResetPassword,
    userChangePassword
}