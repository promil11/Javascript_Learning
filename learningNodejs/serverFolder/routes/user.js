const express = require("express")
const router = express.Router()
const {
    displayUserData,
    getAllUserData,
    getUserById,
    createUserData,
    updateUserById,
    deleteUserById
} = require("../controllers/user.js")


router.get('/display', displayUserData)

router.get('/', getAllUserData)

router.get('/:id', getUserById)

router.post('/', createUserData)

router.patch('/:id', updateUserById)

router.delete('/:id', deleteUserById)

module.exports = router