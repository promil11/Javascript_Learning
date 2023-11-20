const models = require("../models")

async function readCustomerProfile(req, res) {
    let {id} = req?.params
    if(id) {
        models.User.findOne({
            where: {
                id: id
            }
        }).then((result)=>{
            if(result) {
                res.status(200).send({
                    status:1,
                    message: "customer data fetch successfully",
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

async function deleteCustomerProfile(req, res) {
    let {id} = req?.params;
    if(id) {
        models.User.destroy({where: {id: id}}).then((result)=>{
            if(result){
                res.status(200).json({
                    status:1,
                    message:"data deleted successfully",
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
    }
}


async function updateCustomerProfileImg(req, res) {
    let { id } = req?.params
    const { profileImage } = req?.body;
    
    if(id) {
        const userData = await models.User.findOne({
            where: {
                id: id,
            }
        })
        if(userData){
            models.User.update({profileImage}, {
            where: {
                id: id
            }
        }).then((result)=>{
            res.status(200).json({
                status: 1,
                message: "updated successfully",
                result: result
            })
        }).catch((error)=>{
            res.status(400).json({
                status: 0,
                message: "Invalid credential...data is not updated",
                error: error
            })
        })
        }
        else {
            res.status(400).json({
                status: 0,
                message: "Invalid credential...data is not updated",
            })
        }
    }else {
        res.status(400).json({
            status: 0,
            message: "Invalid credential...data is not updated",
        })
    }    
}

async function updateCustomerProfileAddress(req, res) {
    let { id } = req?.params
    const { addressLine1, addressLine2, typeAddress } = req?.body;
    
    if(id) {
        models.User.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.Address,
                    where: {
                        userId: id,
                        typeAddress: typeAddress
                    }
                }
            ]
        }).then((result)=>{
            if(result) {
                models.Address.update({addressLine1, addressLine2}, {
                    where: {
                        id: result.Addresses[0].dataValues.id
                    }
                }).then((result)=>{
                    res.status(200).json({
                        status: 1,
                        message: "updated successfully",
                        result: result
                    })
                }).catch((error)=>{
                    res.status(400).json({
                        status: 0,
                        message: "Invalid credential...data is not updated",
                        error: error
                    })
                })
            } else {
                res.status(400).json({
                    status: 0,
                    message: "Invalid credential...data is not updated",
                })
            }
        }).catch((error)=>{
            res.status(400).json({
                status: 0,
                message: "Invalid credential...data is not updated",
            })
        })
    } else {
        const {userId, typeAddress, country, state, city, pinCode, addressLine1, addressLine2} = req?.body
        models.Address.create({userId, typeAddress, country, state, city, pinCode, addressLine1, addressLine2}).then((result)=>{
            console.log(result)
            res.status(201).json({
                status: 1,
                message: "user address data registered successfullly",
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
}

async function createCustomerOrder(req, res) {
    const {userId, orderDate, totalAmount, status, paymentMethod, shippingAddress} = req?.body
        models.Order.create({userId, orderDate, totalAmount, status, paymentMethod, shippingAddress}).then((result)=>{
            console.log(result)
            res.status(201).json({
                status: 1,
                message: "user order data registered successfullly",
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

async function fetchCustomerOrder(req, res) {
    let {id} = req?.params
    if(id) {
        models.User.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.Order
                }
            ]
        }).then((result)=>{
            if(result) {
                res.status(200).send({
                    status:1,
                    message: "customer data fetch successfully",
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
}


module.exports = {
     readCustomerProfile,
     updateCustomerProfileImg,
     deleteCustomerProfile,
     updateCustomerProfileAddress,
     createCustomerOrder,
     fetchCustomerOrder
}