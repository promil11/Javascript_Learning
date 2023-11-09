const models = require("../models")
const { Op } = require("sequelize");
async function testOneToMany(req, res) {
    const fetchId = req.query.id
    // user has one to many relation with post
    const userData = await models.User.findAll({
        // where: {
        //     id: fetchId,
        // },
        // attributes: ["name"],
        // include: [
        //     {
        //         model: models.Post, 
        //         as: "myPost",
        //         where: {
        //             id: {
        //                 [Op.gt] : 5
        //             }
        //         },
        //         right: true,
        //         required: true,
        //         all: true
        //     }
        // ]
        include: {all: true, nested: true, paranoid: false},
        order: [
            ["name", "DESC"]
        ]
    }  
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
    //     // data: postData.User.name 
    //     data: postData
    // })
}

async function testOneToOne(req, res) {
    const fetchId = req.query.id
    // user has one relation with image table
    const userImageData = await models.User.findOne({
        where: {
            id: fetchId
        },
        include: [models.Imageuplaod]
    })
    res.status(200).json({
        // data: post.User.name 
        data: userImageData
    })

    // image has one relation with user
    // const userData = await  models.Imageuplaod.findOne({
    //     where: {
    //         id: fetchId
    //     },
    //     include: [models.User]
    // })
    // res.status(200).json({
    //     // data: post.User.name 
    //     data: userData
    // })
}

async function testManyToMany(req, res) {
    const fetchId = req.query.id
    const teacherData = await models.Teacher.findAll({
        where: {
            teacher_code: fetchId
        },
        include: [{
            model: models.Student,
            attributes: ["id", "student_name"],
            through: {
                where: {
                    studentId: {
                        [Op.gt]: 3
                    }
                }
            }
        }]
    })
    res.status(200).json({
        data: teacherData
    })
    // const fetchName = req.query.name
    // const teacherData = await models.Student.findAll({
    //     where: {
    //         student_name: fetchName
    //     },
    //     include: [models.Teacher]
    // })
    // res.status(200).json({
    //     data: teacherData
    // })
}

async function filteration(req, res) {
    // const queryData = req.query
    // let operation;
    // if(queryData.sort === "ascPrice"){
    //     operation = "ASC"
    // }
    // else if(queryData.sort === "descPrice") {
    //     operation = "DESC"
    // }
    const result = await models.User.findAll({
        attributes: [
            [models.sequelize.fn("COUNT", models.sequelize.col("name")), "nameCount"],
            "name"
        ],
        group: ["name"],
        order: [
            ["nameCount", "dESC"] 
        ],
        limit: 2,
        offset: 1

        /////////////////
        // where: {
            // [Op.or]: [
            //     {
            //         name: {
            //             [Op.like]: "%"+ queryData.name+ "%"
            //         }
            //     },
            //     {
            //         email: {
            //             [Op.like]: "%"+ queryData.email + "%"
            //         }
            //     }   
            // ]
            // id: queryData.user_id
            /////////////////////////
        //     [Op.not]: [
        //         {
        //             id: [1,2]
        //         }, 
        //         {
        //             name: {
        //                 [Op.like]: queryData.check+ "%"
        //             }  
        //         } 
        // ]
        // },

        //////////////////////
        // order: [
        //     ["name", operation]
        // ]
        
        // include: [models.Post]
    })
    res.status(200).json({
        // data: result[0].Posts[0].title
        data: result
    })
}

async function barFoo(req, res) {
    // const result = await models.Foo.findAll({
    //     include: [{
    //         model: models.Bar,
    //         as: "myBar"
    //     }]
    // })
    // res.status(200).json({
    //     // data: result[0].Posts[0].title
    //     data: result
    // })
    const result = await models.Bar.findAll({
        include: [{
            model: models.Foo,
            as: "myFoo"
        }]
    })
    res.status(200).json({
        // data: result[0].Posts[0].title
        data: result
    })
}

module.exports = {testOneToMany,testManyToMany,testOneToOne,filteration,barFoo}