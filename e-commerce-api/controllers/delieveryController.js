const models = require("../models")
const { jwtDecode } = require('jwt-decode');
const {checkPermission} = require("../middleware/checkPermission.js");
const speakeasy = require('speakeasy'); 

async function delieveryFetchOrder(req,res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'GetCustomerOrder').then(()=>{
            let {order_id} = req?.body
            models.Order.findOne({
                where:{
                    id: order_id
                },
                attributes: ['userId', "totalAmount", "paymentMethod", "shippingAddress"]
            }).then((result)=>{
                res.status(200).json({
                    result: result
                })
            })
        }).catch((error)=>{
            res.status(401).json({
                status: 0,
                message: "you are unauthorized to access this service",
                error: error
            });
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "internal server error",
            error: error
        });
    }
}

async function delievredOrdered(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'DelieveredOrderStatusChange').then(()=>{
            let {order_id} = req?.body
            models.Order.findOne({
                where:{
                    id: order_id
                },
                attributes: ['userId', "totalAmount", "paymentMethod", "shippingAddress"]
            }).then((result)=> {
                if(result.paymentMethod === 'cash on delivery') {
                    models.Order.update({status: 'delivered to user', isDelivered: 1},{
                        where: {
                            id: order_id
                        }
                    }).then((result)=>{
                        res.status(201).json({
                            status: 1,
                            message: "product delivered to user successfullly",
                            user: result,
                        });
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong ...invalid credential",
                            error: error,
                        });
                    })
                } else if (result.paymentMethod === 'online') {
                    const secret = speakeasy.generateSecret({ length: 20 }); 
                    const code = speakeasy.totp({ 
                        secret: secret.base32, 
                        encoding: 'base32'
                    }); 

                    console.log('Secret: ', secret.base32); 
                    console.log('Code: ', code);

                    models.Order.update({OTP: code},{
                        where: {
                            id: order_id
                        }
                    }).then(()=>{
                        res.status(201).json({
                            status: 1,
                            message: "OTP send successfull to user"
                        });
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong ...invalid credential",
                            error: error,
                        });
                    })
                }
            }).catch((error)=> {
                res.status(400).json({
                    status: 0,
                    message: "something went wrong ...invalid credential",
                    error: error,
                });
            })
        }).catch((error)=> {
            res.status(400).json({
                status: 0,
                message: "something went wrong ...invalid credential",
                error: error,
            });
        })
    } catch(error) {
        res.status(400).json({
            status: 0,
            message: "something went wrong ...invalid credential",
            error: error,
        });
    }
}

async function verifyOtp(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'VerifyOtp').then(async()=>{
            let {getOtpUser, order_id} = req?.body
            let data = await models.Order.findOne({
                where: {
                    id: order_id
                }
            })
            if(data) {
                if(data.OTP === getOtpUser) {
                    models.Order.update({status: 'delivered to user', isDelivered: 1, OTP: null},{
                        where: {
                            id: order_id
                        }
                    }).then((result)=>{
                        res.status(201).json({
                            status: 1,
                            message: "product delivered to user successfullly",
                            user: result,
                        });
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong ...invalid credential",
                            error: error,
                        });
                    })
                } else {
                    res.status(400).json({
                        status: 0,
                        message: "OTP is invalid ...invalid credential",
                    });
                }
            }else {
                res.status(400).json({
                status: 0,
                message: "something went wrong ...invalid credential",
            });
        }
    }).catch((error)=> {
        res.status(400).json({
            status: 0,
            message: "something went wrong ...invalid credential",
            error: error,
        });
    })
} catch(error) {
    res.status(400).json({
        status: 0,
        message: "something went wrong ...invalid credential",
        error: error,
    });
}
}

module.exports = {
    delieveryFetchOrder,
    delievredOrdered,
    verifyOtp
}