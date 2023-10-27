async function displayViewHomeEJS(req, res) {
    return res.render("home")
}

async function uploadFileEJS(req, res) {
    res.render("uploadFile")
}

async function handleUploadForm(req, res) {
    console.log(req.file)
    console.log(req.body)
}

module.exports = {
    displayViewHomeEJS,
    uploadFileEJS,
    handleUploadForm
}