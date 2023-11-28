const models = require("../models")
const { jwtDecode } = require('jwt-decode');
const {checkPermission} = require("../middleware/checkPermission.js")

async function createCategory(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'CreateCategory').then(()=>{
            const {categoryName, description, parentCategoryId, isActive, imageUrl} = req?.body
            models.Category.create({categoryName, description, parentCategoryId, isActive, imageUrl} ).then((result)=>{
                res.status(201).json({
                    status: 1,
                    message: " category data registered successfullly",
                    user: result,
                    });
            }).catch((error)=>{
                res.status(400).json({
                    status: 0,
                    message: "something went wrong ...invalid credential",
                    error: error,
                });
            })
        }).catch((error)=>{
            res.status(401).json({
                status: 0,
                message: "you are unauthorized to access this service",
                error: error
            });
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "internal server error",
            error: error
        });
    }
}

async function readParentCategory(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'ReadParentCategory').then(()=>{
            models.Category.findAll({
                where: {
                    parentCategoryId: null
                },
                include: [
                    {
                        model: models.Category,
                        as: "subCategories"
                    }
                ]
            }).then((result)=>{
                res.status(201).json({
                    status: 1,
                    message: " fetch category data successfullly",
                    user: result,
                    });
            }).catch((error)=>{
                res.status(500).json({
                    status: 0,
                    message: "something went wrong",
                    error: error,
                });
            })
        }).catch((error)=>{
            res.status(401).json({
                status: 0,
                message: "you are unauthorized to access this service",
                error: error
            });
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "internal server error",
            error: error
        });
    }
}

async function readChildCategorySlug(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'ReadParentCategory').then(()=>{
            let {slug} = req?.params
            if(slug){
                models.Category.findOne({
                    where: {
                        slug: slug
                    }
                }).then((result)=>{
                    if(result.id){
                        models.Category.findAll({
                            where: {
                                parentCategoryId: result.id
                            },
                            include: [
                                {
                                    model: models.Category,
                                    as: "subCategories"
                                }
                            ]
                        }).then((result)=>{
                            res.status(201).json({
                                status: 1,
                                message: " fetch category data successfullly",
                                user: result,
                                });
                        }).catch((error)=>{
                            res.status(500).json({
                                status: 0,
                                message: "something went wrong",
                                error: error,
                            });
                        })
                        
                    } else {
                        res.status(400).json({
                            status: 0,
                            message: "bad request...credential invalid"
                        })
                    }
                }).catch((error)=>{
                    res.status(400).json({
                        status: 0,
                        message: "bad request...credential invalid",
                        error: error
                    })
                })
            }else{ 
                res.status(400).json({
                    status: 0,
                    message: "bad request...credential invalid"
                })
            }
        }).catch((error)=>{
            res.status(401).json({
                status: 0,
                message: "you are unauthorized to access this service",
                error: error
            });
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "internal server error",
            error: error
        });
    }
}

async function deleteCategory(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'DeleteCategory').then(()=>{
            let { id } = req?.params
            if( id ) {
                models.Category.destroy(
                    {
                        where: {id: id},
                        individualHooks: true,
                     }).then((result)=>{
                            if(result){
                                res.status(200).json({
                                    status:1,
                                    message:"category data deleted successfully",
                                    result: result
                                })
                            }
                            else {
                                res.status(400).json({
                                    status: 0,
                                    message: "Bad request...credential Not Valid"
                                });
                            } 
                    }).catch((error)=>{
                        res.status(400).json({
                            status:0,
                            message:"credential Not Valid....data is not deleted",
                            error: error
                        })
                    })
            } else {
                res.status(400).json({
                    status: 0,
                    message: "Bad request...credential Not Valid"
                });
            }
        }).catch((error)=>{
            res.status(401).json({
                status: 0,
                message: "you are unauthorized to access this service",
                error: error
            });
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "internal server error",
            error: error
        });
    }
    
}

async function updateCategoryId(req, res) {
    try{
        let token = req.headers["jwt_token"]
        let decodedToken = jwtDecode(token)
        checkPermission(decodedToken.roleId, 'UpdateCategory').then(()=>{
            let { id } = req?.params
            if(id){
                let {categoryName, description, parentCategoryId, isActive, imageUrl} = req?.body
                models.Category.update({categoryName, description, parentCategoryId, isActive, imageUrl}, {
                    where: {
                            id: id
                        }
                    }).then((result)=>{
                        if(result){
                            res.status(200).json({
                                status:1,
                                message:"category data update successfully",
                                result: result
                            })
                        }
                        else {
                            res.status(400).json({
                                status: 0,
                                message: "Bad request...credential Not Valid"
                            });
                        } 
                }).catch((error)=>{
                    res.status(400).json({
                        status:0,
                        message:"Bad request...credential Not Valid",
                        error: error
                    })
                })
            } else {
                res.status(400).json({
                    status: 0,
                    message: "Bad request...credential Not Valid"
                });
            }
        }).catch((error)=>{
                res.status(401).json({
                    status: 0,
                    message: "you are unauthorized to access this service",
                    error: error
                });
            })
        } catch (error) {
            res.status(500).json({
                status: 0,
                message: "internal server error",
                error: error
            });
        }
}


module.exports = {
    createCategory,
    readParentCategory,
    readChildCategorySlug,
    deleteCategory,
    updateCategoryId
}