const models = require("../models")
const { jwtDecode } = require('jwt-decode');

async function readCustomerProfile(req, res) {
    let {id} = req?.params
    if(id) {
        models.User.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.PhoneNumber,
                    where: {
                        userId: id
                    }
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
    }
}

async function deleteCustomerProfile(req, res) {
    let {id} = req?.params;
    if(id) {
        models.User.destroy({
            where: {id: id},
        }).then((result)=>{
            res.status(200).json({
                status:1,
                message:"data deleted successfully",
                result: result
            })
        }).catch((error)=>{
            res.status(400).json({
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

async function restoreDeleteCustomerProfile(req, res) {
    let {id} = req?.params;
    if(id) {
        models.User.restore({where: {id: id}}).then((result)=>{
            if(result){
                res.status(200).json({
                    status:1,
                    message:"data restore successfully",
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

async function updateCustomerProfile(req, res) {
    let token = req.headers["jwt_token"]
    let decodedToken = jwtDecode(token)
    let profileImage = req?.file?.filename
    let {phoneNumber1, id1, phoneNumber2, id2} = req?.body 
    if(decodedToken.id) {
        const userData = await models.User.findOne({
            where: {
                id: decodedToken.id,
            }
        })
        if(userData && profileImage){
            models.User.update({profileImage}, {
            where: {
                id: decodedToken.id
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
    const { addressLine1, addressLine2, typeAddress} = req?.body;
    
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



module.exports = {
     readCustomerProfile,
     updateCustomerProfile,
     deleteCustomerProfile,
     updateCustomerProfileAddress,
     restoreDeleteCustomerProfile
}