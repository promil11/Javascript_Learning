
// Promise --->are solution of callback hell
// three state-->1)pending  2)resolve  3)reject 

// console.log("START");

// const promiseObject = new Promise(function(resolve,reject){
//     setTimeout(()=>{
//         resolve("data fetch successfully....")
//         // reject("api doesn't work");
//     },3000);
//     // reject("api doesn't work");
// }) 

// const promiseObject2 = new Promise(function(resolve,reject){
//     setTimeout(()=>{
//         resolve("data2 fetch successfully....")
//     },1000);
//     // reject("api doesn't work");
// }) 

// promiseObject.then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })
 

//promise.all return all data eksath when all data is resolve if one of the promise return reject the promise.all return reject ====>IMPORTANT
// Promise.all([promiseObject,promiseObject2]).then((data)=>{
//     console.log(data);
// }).catch((err)=>{console.log(err)});



// asyn/await

// function getCheese()
// {
//     const readyCheese =  new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             resolve("your cheese is ready");
//         },3000)
//     })
//     // console.log(readyCheese);  //return promise with pending state
//     console.log("woooo");
//     return readyCheese;
// }

// function makeDough(cheese)
// {
//     const readyDough = new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             resolve("your dough is ready");
//         },4000)
//     })
//     console.log("wooo");
//     return readyDough;
// }

// function bakePizza(dough)
// {
//     const readyPizza = new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             resolve("your pizza is ready");
//         },5000)
//     })
//     console.log("wooo")
//     return readyPizza;
// }

// async function getPromiseData(){
//     const cheese = await getCheese();
//     console.log(cheese)
//     const dough = await makeDough(cheese);
//     console.log(dough)
//     const pizza = await bakePizza(dough);
//     console.log(pizza)
//     console.log("delivered....");
// }

// getPromiseData();