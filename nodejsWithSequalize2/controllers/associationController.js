const models = require("../models")

async function test(req, res) {
    // one-to-one
    // const user = await models.User.findByPk(7, {
    //     include: [models.Post]
    // })

    // const post = await models.Post.findByPk(4, {
    //     include: [models.User]
    // }) 

    // one-to-many
    // const user = await models.User.findByPk(7,{
    //     include: [models.Post]
    // })


    // many-to-many
    // const post = await models.Post.findByPk(4, {
    //     include: [models.Category]
    // })

    // const category = await models.Category.findByPk(3, {
    //     include: [models.Post]
    // })
    
    // res.status(200).json({
    //     data: category
    // })


    // lazy loading...
    // let data = await models.User.findByPk(7)
    // let postData = await data.getPosts()
    // console.log(postData)
    // res.status(200).json({
    //     user: data,
    //     post: postData
    // })

    //eager loading...
    let data = await models.User.findByPk(7, {
        include: [{
            model:models.Post, 
            // required: true, //inner join
            // right: true //right outer join
        }]
    })
    res.status(200).json({
        user: data
    })
}


module.exports = {
    test
}