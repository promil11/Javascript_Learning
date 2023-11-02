const models = require("../models");
const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {jwtDecode} = require("jwt-decode");


async function userRegister(req, res) {
  //checking duplicate email
  models.User.findOne({ where: { email: req.body.email } }).then(
    async (result) => {
      if (result) {
        res.status(400).json({
          status: 0,
          message: "Email already Exist",
        });
      } else {
        let hashedPassword;
        if (req.body.password) {
          hashedPassword = await bcrypt.hash(req.body.password, 10);
        }

        let userData = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        };

        let validSchema = {
          name: {
            type: "string",
            optional: false,
            min: 3,
          },
          email: {
            type: "string",
            optional: false,
          },
          password: {
            type: "string",
            optional: false,
            min: 8,
          },
        };

        const v = new Validator();

        let validationResponse = v.validate(userData, validSchema);
        if (validationResponse === true) {
          models.User.create(userData)
            .then((result) => {
              // console.log(result)
              res.status(201).json({
                status: 1,
                message: "user data registered successfullly",
                user: result,
              });
            })
            .catch((error) => {
              res.status(500).json({
                status: 0,
                message: "something went wrong",
                error: error,
              });
            });
        } else {
          res.status(400).json({
            status: 0,
            message: "validation failed!! bad request",
            error: validationResponse,
          });
        }
      }
    }
  );
}

async function generateJwtAccessToken(req, res, userData) {
  let jwtAccessToken = jwt.sign(userData, process.env.SECRET, {
    expiresIn: "2m",
  });
  return jwtAccessToken;
}

async function generateRefreshToken(req, res, userData) {
  let refreshToken = jwt.sign(userData, process.env.REFRESHKEY, {
    expiresIn: "30d",
  });
  return refreshToken;
}

async function userLogin(req, res) {
  let userData = {
    email: req.body.email,
    password: req.body.password,
  };

  let validSchema = {
    email: {
      type: "string",
      optional: false,
    },
    password: {
      type: "string",
      optional: false,
      min: 8,
    },
  };

  const v = new Validator();

  let validationResponse = v.validate(userData, validSchema);
  if (validationResponse === true) {
    models.User.findOne({ where: { email: req.body.email } })
      .then(async (result) => {
        if (result != null) {
          // console.log(result)
          if (
            await bcrypt.compare(req.body.password, result.dataValues.password)
          ) {
            let jwtAccessToken = await generateJwtAccessToken(
              req,
              res,
              userData
            );
            let refreshToken = await generateRefreshToken(req, res, userData);
            res
              .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
              })
              .header("Authorization", jwtAccessToken)
              .status(200)
              .json({
                status: 1,
                message: "user loggedIn successfully",
                jwt_token: jwtAccessToken,
                refresh_token: refreshToken,
              });
          } else {
            res.status(400).json({
              status: 0,
              message: "credential Not Valid",
            });
          }
        } else {
          res.status(400).json({
            status: 0,
            message: "credential Not Valid",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: 0,
          message: "credential Not Valid",
          error: error,
        });
      });
  } else {
    res.status(400).json({
      status: 0,
      message: "credential Not Valid",
      error: validationResponse,
    });
  }
}


function forgotPassword(req, res){
    models.User.findOne({where: {email: req.body.email}}).then(async (result)=>{
        if(result) {
          let userData = {
            email: req.body.email,
            id: result.dataValues.id
          }
          console.log(userData)
            let secretKeyMail = process.env.SECRET + result.dataValues.password
            let tokenGenerate = jwt.sign(userData, secretKeyMail, {expiresIn: "10m"})
            let linkGenerate = `http://localhost:4002/user/resetpassword/${tokenGenerate}`;
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

async function userPostResetPassword(req, res) {
  let token = req.params.token
  let decodedToken = jwtDecode(token)
  models.User.findOne({where: {email: decodedToken.email}}).then(async (result)=>{
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
  forgotPassword,
  userPostResetPassword,
  userChangePassword
};
