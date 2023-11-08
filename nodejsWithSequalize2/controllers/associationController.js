const models = require("../models")

async function testOneToMany(req, res) {
    const fetchId = req.query.id
    // user has one to many relation with post
    const userData = await models.User.findAll({
        where: {
            id: fetchId
        },
        include: [models.Post]
    },  
    )
    res.status(200).json({
        data: userData
    })

    // post has one to one relation with user
    // const postData = await models.Post.findOne({
    //     where: {
    //         id: fetchId,
    //     },
    //     include: [models.User]
    // })
    // res.status(200).json({
        // data: postData.User.name 
        // data: postData
    // })
}

async function testOneToOne(req, res) {
    const fetchId = req.query.id
    // user has one relation with image table
    // const userImageData = await models.User.findOne({
    //     where: {
    //         id: fetchId
    //     },
    //     include: [models.Imageuplaod]
    // })
    // res.status(200).json({
    //     // data: post.User.name 
    //     data: userImageData
    // })

    // image has one relation with user
    const userData = await  models.Imageuplaod.findOne({
        where: {
            id: fetchId
        },
        include: [models.User]
    })
    res.status(200).json({
        // data: post.User.name 
        data: userData
    })
}

async function testManyToMany(req, res) {
    // const fetchId = req.query.id
    // const teacherData = await models.Teacher.findAll({
    //     where: {
    //         teacher_code: fetchId
    //     },
    //     include: [models.Student]
    // })
    // res.status(200).json({
    //     data: teacherData
    // })
    const fetchName = req.query.name
    const teacherData = await models.Student.findAll({
        where: {
            student_name: fetchName
        },
        include: [models.Teacher]
    })
    res.status(200).json({
        data: teacherData
    })
}

module.exports = {testOneToMany,testManyToMany,testOneToOne}