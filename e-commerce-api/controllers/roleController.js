const models = require("../models")

async function getFromRole(req, res) {
    let {user_id} = req?.body
    await models.User.findOne({
        where: {
            id: user_id,
        },
        attributes: {exclude: ['password']},
        include: [
            {
                model: models.Role,
                as: "role",
                include: [
                    {
                        model: models.Permission,
                        as: "permissions",
                    }
                ]
            }
        ]
    }).then((result)=>{
        res.status(200).json({
            result: result,
            status: 1
        })
    })
}

module.exports = {
    getFromRole
}