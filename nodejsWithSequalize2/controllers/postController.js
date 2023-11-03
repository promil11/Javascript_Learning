const models = require("../models")
const Validator = require("fastest-validator");

function insertData(req, res) {
    let post = {
        title:req.body.title,
        content:req.body.content,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId,
        userId:7
    }
    // A string field has a limit of 255 characters, whereas a text field has a character
    //  limit of 30,000 characters.
    let validSchema = {
        title: {
            type: "string", min: 3, max: 255, optional: false
        },
        content: {
            type: "string", max: 1000, optional: false
        },
        categoryId: {
            type: "number", optional: false
        }
    }

    const v = new Validator();
    let validationResponse = v.validate(post,validSchema)

    if(validationResponse === true){
        models.Post.create(post).then((result)=>{
            res.status(201).json({
                status:1,
                message: "post create successfully",
                post: result
            })
        }).catch((error)=>{
            res.status(500).json({
                status:0,
                message:"something went wrong",
                error: error
            })
        })
    }else {
        res.status(400).json({
            status:0,
            message: "validation failed!! Bad request",
            error: validationResponse
        })
    }
   
}

function fetchAllPost(req, res) {
    models.Post.findAll().then((result)=>{
        if(!result[0])return res.status(400).send("Bad Request")
        res.status(200).json({
            status:1,
            message: "post data fetch successfullly",
            post: result
        })
    }).catch((error)=>{
        res.status(500).json({
            status:0,
            message: "something went wrong",
            error: error
        })
    })
}

function fetchPostById(req, res) {
    const id = req.params.id
    models.Post.findByPk(id).then((result)=>{
        if(!result[0])return res.status(400).send("Bad Request")
        res.status(200).json({
            status:1,
            message: "post data fetch successfullly",
            post: result
        })
    }).catch((error)=>{
        res.status(500).json({
            status:0,
            message: "something went wrong",
            error: error
        })
    })
}

function updatePostById(req, res) {
    const id = req.params.id
    const updatedPost = {
        title:req.body.title,
        content:req.body.content,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId,
    }
    const userId = 2

    let validSchema = {
        title: {
            type: "string", min: 3, max: 255, optional: false
        },
        content: {
            type: "string", max: 1000, optional: false
        },
        categoryId: {
            type: "number", optional: false
        }
    }

    const v = new Validator();
    let validationResponse = v.validate(updatedPost,validSchema)

    if(validationResponse === true){
        models.Post.update(updatedPost, {where: {id: id, userId: userId}}).then((result)=>{
            if(!result[0])return res.status(400).send("Bad Request")
            res.status(200).json({
                status:1,
                message:"post update successfully",
                post: result
            })
        }).catch((error)=>{
            res.status(500).json({
                status:0,
                message:"post is not updated",
                error: error
            })
        })
    }else {
        res.status(400).json({
            status:0,
            message: "validation failed!! Bad request",
            error: validationResponse
        })
    }
}

function deletePostById(req, res) {
    const id = req.params.id  //userId 2 hi postId 3 ko delete kr shkta h
    const userId = 2
    models.Post.destroy({where: {id: id, userId: userId}}).then((result)=>{
        if(!result[0])return res.status(400).send("Bad Request")
        res.status(200).json({
            status:1,
            message:"post deleted successfully",
            post: result
        })
    }).catch((error)=>{
        res.status(500).json({
            status:0,
            message:"post is not updated",
            error: error
        })
    })
}

module.exports = {
    insertData,
    fetchAllPost,
    fetchPostById,
    updatePostById,
    deletePostById
}