const models = require("../models")
const { jwtDecode } = require('jwt-decode');

async function createCustomerOrder(req, res) {
    const {userId, orderDate, totalAmount, status, paymentMethod, shippingAddress, estimatedDeliveryDate, actualDeliveryDate, sellerId, deliveryBoyId, isDelivered, isCancelled} = req?.body
        models.Order.create({userId, orderDate, totalAmount, status, paymentMethod, shippingAddress, estimatedDeliveryDate, actualDeliveryDate, sellerId, deliveryBoyId, isDelivered, isCancelled}).then((result)=>{
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

async function getCustomerOrder(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        let flag = true
        if(decodedToken.id) {
            await models.sequelize.transaction(async (transaction) => {
            let data = await models.User.findAll({
                where: {
                    id: decodedToken.id
                },
                attributes: {exclude: ["password"]},
                include: [
                    {
                        model: models.Order
                    }
                ],
                transaction,
            })
            if(!data[0]){
                flag = false
                return res.status(400).json({
                    status: 0,
                    message: "Invalid credentials...data is not updated",
                });   
            }
            if(flag) {
                return res.status(200).json({
                    status: 1,
                    result : data,
                    message: "Data fetch successfully",
                });
            }
        })
    } 
} catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({
      status: 0,
      message: "Internal Server Error",
      error: error.message,
    });
  } 
}
  

async function cancelAnOrder(req, res) {
    try {
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        let {order_id} = req?.body
        let flag = true

        if(decodedToken.id) {
            console.log(decodedToken.id)
            await models.sequelize.transaction(async (transaction) => {
                if(order_id) {
                    let data = await models.Order.update({isCancelled: 1, status: 'cancelled'},{
                        where: {
                            id: order_id,
                            userId: decodedToken.id
                        },
                        transaction,
                    })
                    if(!data[0]){
                        flag = false
                        return res.status(400).json({
                            status: 0,
                            message: "Invalid credentials...data is not updated",
                        });   
                    }
                }
                if(flag) {
                    res.status(200).json({
                        status: 1,
                        message: "Data updated successfully",
                    });
                }
            })
        } 

    }  catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({
          status: 0,
          message: "Internal Server Error",
          error: error.message,
        });
      } 
}

module.exports = {
    createCustomerOrder,
    getCustomerOrder,
    cancelAnOrder
}