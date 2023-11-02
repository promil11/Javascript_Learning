const jwt = require("jsonwebtoken")

async function userLoginAuth(req, res, next) {
    let token = req.headers["jwt_token"]
    try{
        jwt.verify(token, process.env.SECRET)
        console.log("authentication successfull")
        next()
    }catch{
        let refreshToken = req.headers["refresh_token"]
        try{
            let refreshTokenVerified = jwt.verify(refreshToken, process.env.REFRESHKEY)
            let accessToken = jwt.sign({user: refreshTokenVerified},process.env.REFRESHKEY, { expiresIn: "60000" })
            console.log(accessToken)
            res.header('Authorization', accessToken)
            console.log("recreate access token from refresh Token")
            next()
        }catch(error){
            res.status(400).json({
                status: 0,
                message:"invalid refresh token",
                error: error
            })
        }
    }
}

module.exports = {userLoginAuth}