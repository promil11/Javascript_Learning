const models = require("../models");
const { jwtDecode } = require('jwt-decode');
const { Op } = require("sequelize");
const {checkPermission} = require("../middleware/checkPermission.js")


async function createProduct(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'CreateProduct').then(()=>{
            const {productName, description, price, stockQuantity, imageUrl, isActive, categoryId} = req?.body
            models.Product.create({productName, description, price, stockQuantity, imageUrl, isActive, categoryId}).then((result)=>{
                res.status(201).json({
                    status: 1,
                    message: "Product data registered successfullly",
                    user: result,
                    });
            }).catch((error)=>{
                res.status(500).json({
                    status: 0,
                    message: "something went wrong",
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

async function fetchProduct(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'ReadParentCategory').then(()=>{
            let {id} = req?.params
            if(id) {
                models.Product.findOne({
                    where: {
                        id: id
                    },
                    include: [
                        {
                            model: models.Category
                        }
                    ]
                }).then((result)=>{
                    if(result) {
                        res.status(200).send({
                            status:1,
                            message: "product data fetch successfully",
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
                models.Product.findAll({
                    include: [
                        {
                            model: models.Category
                        }
                    ]
                }).then((result)=>{
                    if(result) {
                        res.status(200).send({
                            status:1,
                            message: "product data fetch successfully",
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

async function deleteProduct(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'DeleteProduct').then(()=>{
            let {id} = req?.params;
            if(id) {
                models.Product.destroy({
                    where: {id: id},
                }).then((result)=>{
                    if(result){
                        res.status(200).json({
                            status:1,
                            message:"Product data deleted successfully",
                            result: result
                        })
                    }
                    else {
                        res.status(400).json({
                            status: 0,
                            message: "Bad request...credential Not Valid"
                        });
                    } 
                }).catch((error)=>{
                    res.status(500).json({
                        status:0,
                        message:"credential Not Valid....data is not deleted",
                        error: error
                    })
                })
            }else {
                res.status(400).json({
                    status: 0,
                    message: "Bad request...credential Not Valid"
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


async function updateProduct(req, res) {
    try {
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'UpdateProduct').then(()=>{
            let { id } = req?.params
            if(id){
                let {productName, description, price, stockQuantity, imageUrl, isActive, categoryId} = req?.body
                models.Product.update({productName, description, price, stockQuantity, imageUrl, isActive, categoryId}, {
                    where: {
                            id: id
                        }
                    }).then((result)=>{
                        if(result){
                            res.status(200).json({
                                status:1,
                                message:"product data update successfully",
                                result: result
                            })
                        }
                        else {
                            res.status(400).json({
                                status: 0,
                                message: "Bad request...credential Not Valid"
                            });
                        } 
                }).catch((error)=>{
                    res.status(400).json({
                        status:0,
                        message:"Bad request...credential Not Valid",
                        error: error
                    })
                })
            } else {
                res.status(400).json({
                    status: 0,
                    message: "Bad request...credential Not Valid"
                });
            }
        }).catch(error => {
            res.status(401).json({
                status: 0,
                message: "you are unauthorized to perform this action....Forbidden"
            });
        })
    }
    catch (error) {
        res.status(500).json({
            status: 0,
            message: "internal server error",
            error: error
        });
    }  
}


async function createReviewProduct(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'CreateProductReview').then(()=>{
            let { order_id, product_id } = req?.query
            models.Review.findOne({
                where: {
                    userId: decodedToken.id,
                    productId: product_id
                }
            }).then((result)=>{
                if(result !== null) {
                    models.User.findOne({
                        where: {
                            id: decodedToken.id
                        },
                        include: [{
                            model: models.Order,
                            where: {
                                id: order_id
                            }
                        }]
                    }).then((result)=>{
                        console.log(result.Orders[0].status)
                        if(result.Orders[0].status === 'delivered to user') {
                            const { review } = req?.body
                            if(review) {
                                models.Review.update({review}, {
                                    where: {
                                        userId: result.id
                                    }
                                }).then((result)=> {
                                    res.status(201).json({
                                        status: 1,
                                        message: " product review data updated successfullly",
                                        user: result,
                                    });
                                }).catch((error)=>{
                                    res.status(400).json({
                                        status: 0,
                                        message: "Bad request...credential Not Valid",
                                        error: error,
                                    });
                                })
                            } else {
                                res.status(400).json({
                                    status: 0,
                                    message: "Bad request...credential Not Valid",
                                    error: error,
                                });
                            }
                        } else {
                            res.status(400).json({
                                status: 0,
                                message: "Bad request...credential Not Valid",
                                error: error,
                            });
                        }
                        }).catch((error)=>{
                            res.status(400).json({
                                status: 0,
                                message: "Bad request...credential Not Valid",
                                error: error,
                            });
                        })
                } else {
                    models.User.findOne({
                        where: {
                            id: decodedToken.id
                        },
                        include: [{
                            model: models.Order,
                            where: {
                                id: order_id
                            }
                        }]
                        }).then((result)=>{
                            if(result.Orders[0].status === 'delivered to user') {
                                const {userId, productId, review} = req?.body
                                    models.Review.create({userId, productId, review}).then((result)=>{
                                        res.status(201).json({
                                            status: 1,
                                            message: " product review data registered successfullly",
                                            user: result,
                                            });
                                    }).catch((error)=>{
                                        res.status(500).json({
                                            status: 0,
                                            message: "something went wrong",
                                            error: error,
                                        });
                                    })
                            } else {
                                res.status(401).json({
                                    status: 0,
                                    message: "unauthorized..not allow to give review on this product"
                                })
                            }
                        }).catch((error)=>{
                            res.status(400).json({
                                status:0,
                                message:"Bad request...credential Not Valid",
                                error: error
                            })
                        })
                    }
                    }).catch((error)=>{
                        res.status(400).json({
                            status:0,
                            message:"Bad request...credential Not Valid",
                            error: error
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

async function fetchReviewProduct(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'FetchProductReview').then(()=>{
            let purchased = false;
            let {productId} = req?.query            
            models.Order.findOne({
                where: {
                    userId: decodedToken.id,
                }
            }).then((result)=>{
                if(result !== null){
                    if(result.status === 'delivered') {
                       purchased = true
                    }
                    models.Review.findAll({
                        where: {
                            productId: productId
                        }
                    }).then((result)=>{
                        if(result !== null) {
                            res.status(200).send({
                                status:1,
                                purchased: purchased,
                                message: "product review fetch successfully",
                                data: result
                            })
                        }else {
                            res.status(400).json({
                                status: 0,
                                message: "Bad request...credential Not Valid"
                            });
                        }
                    }).catch((error)=>{
                        res.status(400).json({
                            status: 0,
                            message: "Bad request...credential Not Valid"
                        });
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
    


async function createCommentProduct(req, res) {
    let token = req.headers["jwt_token"]
    let decodedToken = jwtDecode(token)
    let { order_id } = req?.query
    models.User.findOne({
        where: {
            id: decodedToken.id
        },
        include: [{
            model: models.Order,
            where: {
                id: order_id
            }
        }]
    }).then((result)=>{
        console.log(result)
        if(result.Orders[0].status === 'delivered') {
            userId = decodedToken.id
            const { productId, comment} = req?.body
            console.log(userId, productId, comment)
                models.Comment.create({userId, productId, comment}).then((result)=>{
                    res.status(201).json({
                        status: 1,
                        message: " product comment data registered successfullly",
                        user: result,
                        });
                }).catch((error)=>{
                    res.status(500).json({
                        status: 0,
                        message: "something went wrong",
                        error: error,
                    });
                })
        } else {
            res.status(401).json({
                status: 0,
                message: "unauthorized..not allow to give comment on this product"
            })
        }
    }).catch((error)=>{
        res.status(400).json({
            status:0,
            message:"Bad request...credential Not Valid",
            error: error
        })
    })
}

async function fetchCommentProduct(req, res) {
    let purchased = false;
    let {productId} = req?.query
    let token = req.headers["jwt_token"]
    let decodedToken = jwtDecode(token)
    console.log(decodedToken.id, productId)
    
    models.Order.findOne({
        where: {
            userId: decodedToken.id,
        }
    }).then((result)=>{
        if(result !== null){
            if(result.status === 'delivered') {
               purchased = true
            }
            models.Comment.findAll({
                where: {
                    productId: productId
                }
            }).then((result)=>{
                if(result !== null) {
                    res.status(200).send({
                        status:1,
                        purchased: purchased,
                        message: "product comment fetch successfully",
                        data: result
                    })
                }else {
                    res.status(400).json({
                        status: 0,
                        message: "Bad request...credential Not Valid"
                    });
                }
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
} 

async function filterationProduct(req, res) {
    const {q, category, s, ps, page} = req?.query
    let pageSize = ps && !isNaN(ps) ? parseInt(ps) : 16
    let offsetSize = ps && !isNaN(page) ? parseInt(page) : 0
    let options = {}
    if(s) {
        options.order = [[s , "DESC"]]
    }
    if(q && category) {
        options["where"] =  {
            [Op.and]: {
                [Op.or]: {
                    productName: {
                        [Op.like] : '%' + q + "%"
                    },
                    description: {
                        [Op.like]: "%" + q + "%"
                    }
                },
                categoryId: category
            }
        }
        options["limit"] = pageSize
        options["offset"] = (offsetSize - 1) * pageSize
    } else if (q) {
        options["where"] =  {
            [Op.or]: {
                productName: {
                    [Op.like] : '%' + q + "%"
                },
                description: {
                    [Op.like]: "%" + q + "%"
                }
            }
        }
        options["limit"] = pageSize
        options["offset"] = (offsetSize - 1) * pageSize
    }
    else if (category) {
        options["where"] =  {
            categoryId: category
        }
        options["limit"] = pageSize
        options["offset"] = (offsetSize - 1) * pageSize
    }
  
    let totalCount = await models.Product.count(options)

    models.Product.findAll(
        options
    ).then((result) => {
        console.log(result)
        res.status(200).send({
            totalCount: totalCount,
            status:1,
            message: "filter product data fetch successfully",
            data: result
        })
    })
}

module.exports = {
    createProduct,
    fetchProduct,
    deleteProduct,
    updateProduct,
    createReviewProduct,
    fetchReviewProduct,
    createCommentProduct,
    fetchCommentProduct,
    filterationProduct
}