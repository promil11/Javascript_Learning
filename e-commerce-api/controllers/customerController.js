const models = require("../models")
const { jwtDecode } = require('jwt-decode');
const {checkPermission} = require("../middleware/checkPermission.js")

async function readCustomerProfile(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'ReadCustomerProfile').then(()=>{
            let {id} = req?.params
            if(id) {
                models.User.findOne({
                    where: {
                        id: id
                    },
                    attributes: {exclude: ["password"]},
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
                    res.status(400).json({
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

async function deleteCustomerProfile(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        console.log(decodedToken.roleId)
        checkPermission(decodedToken.roleId, 'DeleteCustomerProfile').then(()=>{
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

async function restoreDeleteCustomerProfile(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        console.log(decodedToken.roleId)
        checkPermission(decodedToken.roleId, 'RestoreCustomerProfile').then(()=>{
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

async function updateCustomerProfile(req, res) {
    try {
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        let profileImage = req?.file?.filename
        let {phoneNumber1, id1, phoneNumber2, id2} = req?.body 
        let flag = true
        console.log(decodedToken.id, decodedToken.roleId)
        checkPermission(decodedToken.roleId, 'UpdateCustomerProfile').then(async()=>{
            if(decodedToken.id) {
                await models.sequelize.transaction(async (transaction) => {
                    if(profileImage) {
                        let data = await models.User.update({profileImage}, {
                            where: {
                                id: decodedToken.id
                            },
                            transaction,
                        })
                        if(!data[0]){
                            console.log(data[0])
                            flag = false
                            return res.status(400).json({
                                status: 0,
                                message: "Invalid credentials...data is not updated",
                            });   
                        }
                    }
                    if(phoneNumber1 && id1) {
                        let data = await models.PhoneNumber.update({ phoneNumber: phoneNumber1 }, {
                            where: {
                              id: id1,
                              userId: decodedToken.id,
                            },
                            transaction,
                          });
                          if(!data[0]){
                            flag = false
                            return res.status(400).json({
                                status: 0,
                                message: "Invalid credentials...data is not updated",
                            });   
                        }
                    }
        
                    if (phoneNumber2 && id2) {
                       let data = await models.PhoneNumber.update({ phoneNumber: phoneNumber2 }, {
                          where: {
                            id: id2,
                            userId: decodedToken.id,
                          },
                          transaction,
                        });
                        if(!data[0]){
                            flag = false
                            return res.status(400).json({
                                status: 0,
                                message: "Invalid credentials...data is not updated",
                            });   
                        }
                      }
                    })
                    if(flag) {
                        res.status(200).json({
                            status: 1,
                            message: "Data updated successfully",
                        });
                    }
            } else {
                res.status(400).json({
                    status: 0,
                    message: "Invalid credentials... data is not updated",
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
        console.error('Error updating data:', error);
        res.status(500).json({
          status: 0,
          message: "Internal Server Error",
          error: error.message,
        });
      } 
}

async function updateCustomerProfileAddress(req, res) {
    try {
        let { id } = req?.params
        const { addressLine1, addressLine2, typeAddress} = req?.body;
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'UpdateCustomerProfileAddress').then(async()=>{
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
        })
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({
          status: 0,
          message: "Internal Server Error",
          error: error.message,
        });
    }
}



module.exports = {
     readCustomerProfile,
     updateCustomerProfile,
     deleteCustomerProfile,
     updateCustomerProfileAddress,
     restoreDeleteCustomerProfile
}