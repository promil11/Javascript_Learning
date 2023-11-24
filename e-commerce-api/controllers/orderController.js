const models = require("../models")

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
    createCustomerOrder,
    fetchCustomerOrder,
}