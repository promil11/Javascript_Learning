let fakeData = require("../fake_data.json")
let fs = require("fs")


function checkEvenId(req, res, next) {
    let filterData = fakeData.filter((item)=>{
        console.log(item.id);
        return item.id%2 === 0;
    })

    console.log(filterData)

    fs.writeFile("../fake_data.json", JSON.stringify(filterData), (err, data)=>{
        console.log("middelware update the fake data file ")
    })
    next()
}
module.exports = {checkEvenId}