const models = require("../models");
const { jwtDecode } = require('jwt-decode');
const {checkPermission} = require("../middleware/checkPermission.js")


async function addToCart( req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'AddToProductInCart').then(()=>{
            models.Cart.findOne({
                where: {
                    userId: decodedToken.id
                }
            }).then((result)=>{
                if(result === null) {
                    models.Cart.create({
                        userId : decodedToken.id
                    }).then((result)=>{
                        console.log(result.id)
                        models.cartProduct.create({
                            cartId: result.id,
                            productId: req?.body.productId,
                            quantity: req?.body.quantity
                        }).then(async(result)=>{
                            res.status(201).json({
                                status: 1,
                                message: "Cart data registered successfullly",
                                user: result,
                                });
                        }).catch((error)=>{
                            res.status(400).json({
                                status: 0,
                                message: "something went wrong...wrong credential",
                                error: error,
                            });
                        })
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong...wrong credential",
                            error: error,
                        });
                    })
                } else {
                    models.cartProduct.create({
                        cartId: result.id,
                        productId: req?.body.productId,
                        quantity: req?.body.quantity
                    }).then((result)=>{
                        res.status(201).json({
                            status: 1,
                            message: "Cart data registered successfullly",
                            user: result,
                        });
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong...wrong credential",
                            error: error,
                        });
                    })
                }
            }).catch((error)=>{
                res.status(400).json({
                    status: 0,
                    message: "something went wrong...wrong credential",
                    error: error,
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

async function getFromCart(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'GetProductFromCart').then(()=>{
            models.Cart.findOne({
                where: {
                    userId: decodedToken.id
                }
            }).then((result)=>{
                if(result) {
                    models.Cart.findOne({
                        where: {
                            userId: decodedToken.id
                        },
                        include: [
                            {
                                model: models.cartProduct,
                                where: {
                                    cartId: result.id
                                },
                                include: [
                                    {
                                        model: models.Product
                                    }
                                ]
                            }
                        ]
                    }).then((result)=>{
                        let totalPrice
                        if (result) {
                            totalPrice = result.cartProducts.reduce((sum, cartProduct) => {
                                return sum + (cartProduct.Product ? cartProduct.Product.price * cartProduct.quantity : 0);
                            }, 0)
                        } else {
                            totalPrice = 0
                        }
                        res.status(201).json({
                            status: 1,
                            totalPrice: totalPrice,
                            message: "Cart data fetch successfullly",
                            user: result,
                        });
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
                        message: "cart not exist for this user",
                    });
                }
            }).catch((error)=>{
                res.status(400).json({
                    status: 0,
                    message: "something went wrong...wrong credential",
                    error: error,
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

async function deleteToCart(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'DeleteProductFromCart').then(()=>{
            models.Cart.findOne({
                where: {
                    userId: decodedToken.id
                }
            }).then((result)=>{
                if(result) {
                    models.cartProduct.destroy({
                        where: {
                            cartId: result.id,
                            productId: req?.body.productId
                        }
                    }).then((result)=>{
                        res.status(201).json({
                            status: 1,
                            message: "product inside cart data deleted successfullly",
                            user: result,
                        });
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "something went wrong...wrong credential",
                            error: error,
                        });
                    })
                } else {
                    res.status(201).json({
                        status: 1,
                        message: "product inside cart data deleted successfullly",
                        user: result,
                    });
                }
            }).catch((error)=>{
                res.status(400).json({
                    status: 0,
                    message: "something went wrong ...invalid credential",
                    error: error,
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
    addToCart,
    getFromCart,
    deleteToCart
}