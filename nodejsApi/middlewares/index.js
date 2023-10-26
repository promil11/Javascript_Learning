// let SECRET = "PROMIL_JAIN_SECRET_KEY"
// let SECRETREFRESHKEY = "PROMIL_JAIN_SECRET_REFRESH_KEY"
const jwt = require("jsonwebtoken")
require('dotenv').config()

async function userLoginAuth(req, res, next) {
    try {
        const token = req.headers["jwttoken"]
        const verified = jwt.verify(token,process.env.SECRET)
        if(verified) {
            console.log("authentication successfull")
            next()
        }else {
            let refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicGFwYTEwQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQHBhcGExMCJ9LCJpYXQiOjE2OTgzMjYzNTcsImV4cCI6MTcwMDkxODM1N30.XCqjk3Lp8FkgVeMcfx05mXqfRPDbEiWyy98fFaD8ACU"
            if(!refreshToken) res.status(401).send("access denied! no refresh token are provided")
            try{
                let verified = jwt.verify(refreshToken, process.env.SECRETREFRESHKEY)
                // console.log(verified)
                let accessToken = jwt.sign({user: verified.user},process.env.SECRETREFRESHKEY, { expiresIn: 300000 })
                res.header('Authorization', accessToken)
                console.log("recreate access token from refresh Token")
                next()
            }catch(err){
                res.status(400).send("invalid refresh token")
            }
        }
    }catch(err) {
        res.status(400).send("invalid token")
    }
};

module.exports = {userLoginAuth}