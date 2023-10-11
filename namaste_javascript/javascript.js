
// task given by vijendra sir to, make custom map function in javascript

// first task=======================================

// Array.prototype.myMap = function(func, thisParam) {

    // using for loop
    //let resultArray = [];
    // for(let i=0; i<this.length; i++)
    // {
    //     resultArray.push(func(this[i], i, thisParam.location))
    // }
    // return resultArray

// ---------------------------------------
    // while
    // let i = 0;
    // while(i<this.length) {
    //     resultArray.push(func(this[i], i, thisParam.location))
    //     i++
    // }
    // return resultArray

    // ---------------------------------------

    // do-while
    // let i = 0;
    // do{
    //     resultArray.push(func(this[i], i, thisParam.location))
    //     i++
    // }while(i<this.length);
    // return resultArray

    // ---------------------------------------
    // for-in
    // for(let i in this)
    // {
    //     resultArray.push(func(this[i], i, thisParam.location))
    // }
    // return resultArray

    // ---------------------------------------
    // for-of
    // for(let i of this)
    // {
    //     resultArray.push(func(i, this.indexOf(i), thisParam.location))
    // }
    // return resultArray

    // ---------------------------------------
    // for-Each
    // this.forEach((val)=>{
    //     resultArray.push(func(val, this.indexOf(val), thisParam.location))
    // })
    // return resultArray
    // }




    // Arrow function////////////////////////////////////

    // Array.prototype.myMap = (func, thisParam) => {
    //     // console.log(this)
    //     let resultArray = [];
    //     for(let i=0; i<thisParam.length; i++)
    //     {
    //         resultArray.push(func(thisParam[i], i))
    //     }
    //     return resultArray
    // }

    // let arr = [1,2,3,4]
    // let objArr = [
    //     {myName : "promil", myCompany : "CIS"},
    //     {myName : "subh", myCompany : "TCS"},
    //     {myName : "raj", myCompany : "Qodeleaf"},
    // ]

    // let returnObjArray =objArr.myMap((val, index, extraStaff)=>{
    //     return val.myName + " " + val.myCompany + " " + index + " " + extraStaff
    // },objArr)
    // console.log(returnObjArray)

    // array//
    // let returnArr = arr.myMap((val,index, extraStaff)=>{
    //     // console.log(this)
    //     return val*20*index + " " + extraStaff
    // },extraAug)
    // console.log(returnArr)

    // array object//
    // let returnObjArray =objArr.myMap((val, index, extraStaff)=>{
    //     return val.myName + " " + val.myCompany + " " + index + " " + extraStaff
    // },extraAug)
    // console.log(returnObjArray)



    // Recursion//////////////////////////////////

    // Array.prototype.myMap = function (func, arr) {
    //     // console.log(arr.length)
    //     let resultArray = []
    //     let i = 0

    //     function abc(func, arr){
    //         if(i >= arr.length) return resultArray
    //         resultArray.push(func(arr[i],i))
    //         i++
    //         abc(func, arr)
    //         return resultArray
    //     }

    //     abc(func, arr)
    //     return resultArray
    // }

    // let array = [1,2,3,4]
    // let objArr = [
    //     {myName : "promil", myCompany : "CIS"},
    //     {myName : "subh", myCompany : "TCS"},
    //     {myName : "raj", myCompany : "Qodeleaf"},
    // ]

    // // array//
    // let returnArr = array.myMap((val,index)=>{
    //     // console.log(this)
    //     return val*20*index
    // },array)
    // console.log(returnArr)

    // // array object//
    // // let returnObjArray = objArr.myMap((val, index)=>{
    // //     return val.myName + " " + val.myCompany + " " + index
    // // },objArr)

    //  let returnObjArray2 = objArr.myMap((val, index)=>{
    //     return val.myName + " " + val.myCompany + " " + index
    // },objArr)
    // console.log(returnObjArray2)





    // second task======================================================

// let myObj = {
//   categories: {
//     electronics: {
//       mobile: {
//         samsung: {
//           galaxy: "M31",
//         },
//       },
//       refrigerator: {
//         LG: {
//           convertible: "modelname",
//         },
//         Samsung: {
//           convertible: "modelname",
//         },
//       },
//       washingmachine: {
//         LG: "modelname LG",
//         Samsung: "modelname samsung",
//       },
//     }
//   }
// };

// let output = {
//   "categories-electronics-mobile-samsung-galaxy": "M31",
//   "categories-electronics-refrigerator-LG-convertible": "modelname",
//   "categories-electronics-refrigerator-Samsung-convertible": "modelname",
//   "categories-electronics-washingmachine-LG": "modelname LG",
//   "categories-electronics-washingmachine-Samsung": "modelname Samsung",
// };


// function getResult(obj, upperObjSting) {
//     let result = {}
//     function generatePattern(obj, upperObjSting) {
//         for(let val in obj){
//             // console.log(val)
//             let newObjString = upperObjSting + val 
//             // console.log(newObjString)
//             let newObj = obj[val]
//             // console.log(newObj)
//             if(typeof newObj === 'object'){
//                 generatePattern(newObj,newObjString + '-')
//             }else{
//                 result[newObjString] = newObj
//             }
//         }
//     }
//     generatePattern(obj, upperObjSting)
//     return result
// }

// let data = getResult(myObj, "")
// data = JSON.stringify(data)
// console.log(data)