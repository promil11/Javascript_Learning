const models = require("../models")

function uploadImage(req, res) {
    if(req.file.filename){
        let imageData = {
            user_id: req.body.user_id,
            user_image: req.file.filename
        }
        models.Imageuplaod.create(imageData).then((result)=>{
            if(result){
                res.status(201).json({
                    message: "image upload successfully",
                    url: req.file.filename
                })
            }
        }).catch(error=>{
            res.status(500).json({
                message: "image cannot uploaded",
                error: error
            })
        })
        
    } else {
        req.status(500).json({
            message: "something went wrong",
        })
    }
}

async function getImage(req, res) {
    const imageId = req.params.id
    models.Imageuplaod.findOne({where: {id: imageId}}).then((result)=>{
        if(result){
            res.status(201).json({
                message: "image fetch successfully",
                result: result.image
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "image cannot uploaded",
            error: error
        })
    })
}

async function paranoidImage(req, res) {  //soft delete using paranoid
    // const result = await models.Imageuplaod.destroy({
    //     where: {
    //         id: 1
    //     }
    // })
    // const result = await models.Imageuplaod.restore({
    //     where: {
    //         id:1
    //     }
    // })

    // const result = await models.Imageuplaod.findAll({paranoid: false})
    // res.status(200).json({
    //     data: result
    // })
}

module.exports = {uploadImage, getImage, paranoidImage}