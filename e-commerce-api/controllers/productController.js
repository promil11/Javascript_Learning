const models = require("../models")

async function createProduct(req, res) {
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
}

async function fetchProduct(req, res) {
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
}

async function deleteProduct(req, res) {
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
}

async function updateProduct(req, res) {
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
}

module.exports = {
    createProduct,
    fetchProduct,
    deleteProduct,
    updateProduct
}