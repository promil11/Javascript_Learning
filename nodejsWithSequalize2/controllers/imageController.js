const models = require("../models")

function uploadImage(req, res) {
    if(req.file.filename){
        let imageData = {
            image: req.file.filename
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

module.exports = {uploadImage, getImage}