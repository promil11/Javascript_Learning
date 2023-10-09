
// getName()

// let x = 7


// console.log(name)//prereserved initially it is empty  string


// let getName = () => {
//     var value = 7;
//     let num = 9;
//     console.log("javascript..")
// }
// getName()

// console.log(getName())
// console.log(x)
// console.log(getName)



// let x = 10
// a()
// function a() {
//     let a= 15
//     console.log(x)
//     function b() {
//         let b = x   
//         console.log(x)
//     }
//     b()
// }

// 'use strict'
// let a = 1;
// function fun() {
//     console.log(this === window)
//     console.log(this === undefined)
// }
// fun()



// console.log(b)
// let b = 19

// {
//     var a = 4
//     let b = 5
//     const c = 6
// }
// console.log(b)  //not defined
// console.log(a)  //var is accesible because var is global scope and it can be accessible from everywhere
//                 //while let and const are block and function scope thats why if we access outside the block and function scope 
//                 //it will give referenceError b abd c are mot defined



// shaddowing

// var a = 10;
// {
//     var a =15;
// }

// let a = 10;
// {
//     let a =15;
// }

// const a = 10;
// {
//     const a =15;
// }

// var a = 10;
// {
//     let a =15;
// }


// let a = 10;
// {
//     const a =15;
// }



// const a = 10;
// {
//     let a =15;
// }


// const a = 10;
// {
//     const a = 20;
//     {
//         const a = 30;
//         {
//             console.log(a) //30
//         }
//     }
//     console.log(a) //20
// }


// closure

// function myFun() {
//     let a =100;
//     function innerFun() {
//         let b =1000;
//         console.log(b)
//         console.log(a)
//     }
//     return innerFun;
// }

// let returnFun = myFun()
// console.log(returnFun)
//             // ƒ innerFun() {
//             //     let b =1000;
//             //     console.log(b)
//             //     console.log(a)
//             // }  but question is where a value come from?? ans closure
//             // closure is defined as a function along with lexical environment
// returnFun()

 
// application
// settimeout + closure
// function x() {
//     for(var i = 1;i<=5; i++){
//         setTimeout(()=>{
//             console.log(i)
//         },i * 1000)
//     }
// }
// x()

// function x() {
//     for(let i = 1;i<=5; i++){
//         setTimeout(()=>{
//             console.log(i)
//         },i * 1000)
//     }
// }
// x()
// function x() {
//     for(var i = 1;i<=5; i++){
//         let val = i;
//         setTimeout(()=>{
//             console.log(val)
//         },val * 1000)
//     }
// }
// x()


// let myArray = [1,2,3,4,5]

// let newArray = myArray.map((val)=>{
//     return val*10;
// })

// console.log(myArray)
// console.log(newArray)


// Array.prototype.myMap = function(func) {
//     let resultArray = [];
//     for(let i=0; i<this.length; i++)
//     {
//         // console.log(this)
//         resultArray.push(func(this[i]))
//     }
//     return resultArray
// }

// let arr = [1,2,3,4]
// let returnArr = arr.myMap((val)=>{
//     return val*20
// })
// console.log(returnArr)
