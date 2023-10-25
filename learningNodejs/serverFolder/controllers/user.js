const User = require("../models/user.js")

async function displayUserData(req, res) {
    let allusers = await User.find({})
    console.log(allusers)
    let data = `
        <ul>
            ${allusers.map((item)=> `<li>${item.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(data)
}

async function getAllUserData(req, res) {
    let allusers = await User.find({})
    console.log(req.myName)
    res.json(allusers)
}

async function getUserById(req, res) {
    let id = req.params.id
    let userDataId = await User.findById(id)
    console.log(userDataId)
    res.send(userDataId)
}

async function createUserData(req, res) {
    let bodyData = req.body
    const result = await User.create({
        first_name: bodyData.first_name,
        last_name: bodyData.last_name,
        email: bodyData.email,
        jobTitle: bodyData.jobTitle,
        gender: bodyData.gender
    })
    console.log(result)
    res.status(201).json("successfully created user")
}

async function updateUserById(req, res) {
    let patchIndex  =  req.params.id
    let bodyData = req.body
    let modifyData = await User.findByIdAndUpdate(patchIndex, bodyData)
    let objArray = Object.keys(bodyData)
    objArray.map((item)=>{
        // console.log(bodyData[item])
        modifyData[item] = bodyData[item]
    })

    res.json(modifyData)
}

async function deleteUserById(req, res) {
    let id = req.params.id
    await User.findByIdAndDelete(id)
    res.json("successfully deleted")
}

module.exports = { displayUserData, getAllUserData, getUserById, createUserData, updateUserById, deleteUserById}