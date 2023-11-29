const models = require("../models")
const { jwtDecode } = require('jwt-decode');
const {checkPermission} = require("../middleware/checkPermission.js")

async function addToWishList(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'AddToWishList').then(()=>{
            let userId = decodedToken.id
            if(userId) {
                const {productId, quantity, isFavorite} = req?.body
                models.wishList.create({userId, productId, quantity, isFavorite}).then((result)=>{
                    res.status(201).json({
                        status: 1,
                        message: "user wishList data registered successfullly",
                        user: result,
                        });
                }).catch((error)=>{
                    res.status(400).json({
                        status: 0,
                        message: "something went wrong...invalid  credential",
                        error: error,
                    });
                })
            } else {
                res.status(400).json({
                    status: 0,
                    message: "something went wrong...invalid  credential",
                    error: error,
                });
            }
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

async function getFromWishList(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'GetProductFromWishList').then(()=>{
            if(decodedToken.id) {
                models.wishList.findAll({
                    where: {
                        userId: decodedToken.id
                    },
                    include: [
                        {
                            model: models.Product
                        },
                        {
                            model: models.User
                        }
                    ]
                }).then((result)=>{
                    if(result) {
                        res.status(200).send({
                            status:1,
                            message: "wishList data fetch successfully",
                            data: result
                        })
                    }else {
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
            } else {
                res.status(400).json({
                    status: 0,
                    message: "credential Not Valid"
                });
            }
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
   

async function deleteToWishList(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'DeleteProductFromWishList').then(()=>{
            models.User.findOne({
                where: {
                    id: decodedToken.id
                }
            }).then((result)=>{
                if(result) {
                    models.wishList.destroy({
                        where: {
                            userId: result.id,
                            productId: req?.body.productId
                        }
                    }).then((result)=>{
                       if(result){
                        res.status(201).json({
                            status: 1,
                            message: "product inside wishList data deleted successfullly",
                            user: result,
                        })
                       } else {
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong...wrong credential",
                        });
                       }
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong...wrong credential",
                            error: error,
                        });
                    })
                } else {
                    res.status(400).json({
                        status: 0,
                        message: "something went wrong...wrong credential",
                    });
                }
            }).catch((error)=>{
                res.status(400).json({
                    status: 0,
                    message: "credential Not Valid ...invalid credential",
                    error: error
                });
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
         

module.exports = {
    addToWishList,
    getFromWishList,
    deleteToWishList
}