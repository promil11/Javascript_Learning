function uploadImage(req, res) {
    if(req.file.filename){
        res.status(201).json({
            message: "image upload successfully",
            url: req.file.filename
        })
    } else {
        req.status(500).json({
            message: "something went wrong",
        })
    }
}

module.exports = {uploadImage}