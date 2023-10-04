// IIFE to make separate execution container apart from global 
// (
//     function(){
//         console.log("IIFE run")
//         let title = "IIFE learning"
//         function getTitle(){
//             console.log(title)
//         }
//         getTitle()
//     }
// )();

// (
//     function(){
//         console.log("IIFE run")
//         let title = "IIFE learning"
//         function getTitle(){
//             console.log(window.title) //give error reference 
//         }
//         getTitle()
//     }
// )();

// let car = (
//     function()
//     {
//         let carName = "Audi"
//         return carName;
//     }
// )();
// console.log(car) //Audi

 //IIFE+CLOUSER  to form private variable
// let car = (
//     function(){
//         let carName = "Audi"
//         return {
//             set setCarName(name){
//                 carName = name
//             },
//             get getCarName(){
//                 return carName
//             }
//         }
//     }
// )();
// console.log(car.getCarName)




           //EXTRA UNDERSTANDING
             
// INFINITY / -INFINITY / isNAN / NaN
// console.log(1/0) //infinity
// console.log(-1/0) //-INFINITY
// console.log(1*"promil") //NAN


// console.log(typeof(undefined)) //undefined
// console.log(typeof(null)) //object
// console.log(typeof(1)) //number
// console.log(typeof("string")) //string
// console.log(typeof([undefined,1,"subhi"])) //object
// console.log(typeof({name:"promil",company:"CIS"})) //object

// console.log(typeof Array) //function
// console.log(typeof Object) //function
// console.log(Array())
// console.log(Object()) 


// let car = (
//     function(){
//         let carName = "Audi"
//         return {
//             set setCarName(name){
//                 carName = name
//             },
//             get getCarName(){
//                 return carName
//             }
//         }
//     }
// )();
// console.log(car.getCarName)


// (   
//     function(){
//         console.log("IIFE run")
//         let title = "IIFE learning"
//         function getTitle(){
//             console.log(title)
//         }
//         getTitle()
//     }
// )();


// higher order function
// function callBackFunction(){
//     console.log("call back function....")
// }

// function higherOrderFunction(callFun){
//     console.log("call higher order function")
//     callFun()
// }

// higherOrderFunction(callBackFunction)

// function callBackFunction(){
//     return function(){
//         console.log("call back function....")
//     }
// }

// function higherOrderFunction(callFun){
//     console.log("call higher order function")
//     const returnedFunc = callFun()
//     console.log(returnedFunc)
//     returnedFunc()
// }

// higherOrderFunction(callBackFunction)



// const myArray = new Array(null) //prototype array   //phle index pr null aa jayega
// console.log(myArray)

// const myArray = new Array(2,"string",{},[]) //prototype array 
// console.log(myArray)




// const myObject = new Object([]) //prototype object
// // myObject.name = "promil"
// console.log(typeof myObject, myObject)

// const myObject = new Object(1) //prototype object
// // myObject.name = "promil"
// console.log(typeof myObject, myObject)

// in null and undefined it will create a empty Object
// const myObject = new Object(undefined) //prototype object
// myObject.name = "promil"
// console.log(myObject)
// const myObject = new Object(null) //prototype object
// myObject.name = "promil"
// console.log(myObject)

const myObject = new Object("w") //prototype object
myObject.name = "promil"
console.log(myObject)

// const myObject = new Object({key1:"pro1"}) //prototype object
// myObject.name = "promil"
// console.log(myObject)

// const myObject = new Object(1,["array1"],{name:"promil"}) //prototype object
// console.log(myObject)



((...arg)=> {
  console.log(...arg);
})("RAM", "2GB");

(console.log)("RAM", "2GB");