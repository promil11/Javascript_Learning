const models = require("../models")

async function readCustomerProfile(req, res) {
    let getId = req.params.id
    if(getId) {
        models.User.findOne({
            where: {
                id: getId
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

async function updateCustomerProfile(req, res) {
    let id = req.params.id
    models.User.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: models.Address
            }
        ]
    }).then((result)=>{
        res.status(200).send(result)
    })
}
module.exports = {
     readCustomerProfile,
     updateCustomerProfile
}