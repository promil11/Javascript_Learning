// async/await
// NOTE 1) async function always return a Promise
// async function myFun() {
//     return "promise aa gya"  //ither to string return ki h ? to promise return kesse hua ? 
//     // answer is:agr apn async function me promise return nhi kr rhe to in this case vh khud
//     //  ek promise bna lega usme meri value rkh dega aur promise return kr dega 
//     // lekin async hmesha promise return krega
// }

// let data = myFun()
// console.log(data) //give here promise
// data.then((resultData)=>{
//     console.log(resultData)   //promise aa gya
// })


// now we have create promise and then return it from async function
// function returnPromise() {
//     let promise = new Promise((resolve, reject)=>{
//         if(1 == 1)return resolve("resolved Promise")
//         return reject("rejected Promise")
//     }) 
//     return promise
// }

// async function getData() {
//     return returnPromise()
// }

// let getDataObj = getData()

// console.log(getDataObj)

// getDataObj.then((resultData)=>{
//     console.log(resultData)
// })

// await//  -->can only write inside the async function
// function returnPromise() {
//     let promise = new Promise((resolve, reject)=>{
//         if(1 == true) return resolve("promise resolved")
//         return reject("promise rejected")
//     })
//     return promise
// }

// async function getPromise() {
//     let getData = await returnPromise() //await means js engine wait here until response get and once it get promise await automatically return resolve or reject value
//     console.log(getData)  //ie return promise resolved
// }

// getPromise()

// NOW PLAY WITH NORMAL PROMISE AND ASYNC AWAIT
// function returnPromise() {
//     let promise = new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             if(1 == true) return resolve("promise resolved")
//             return reject("promise rejected")
//         },3000)
//     })
//     return promise
// }

// function getData() {
//     returnPromise().then((data)=> console.log(data))
//     console.log("after return promise this functionality should be run....")
// }

// getData()
// OUTPUT: which is wrong
// after return promise this functionality should be run....
// promise resolved

// Solution:
// function returnPromise() {
//     let promise = new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             if(1 == true) return resolve("promise resolved")
//             return reject("promise rejected")
//         },3000)
//     })
//     return promise
// }

// async function getData() {
//     let data = await returnPromise() //js engine ko ither hi wait krne ka bolega
//     console.log(data)
//     console.log("after return promise this functionality should be run....")
//     setTimeout(()=>{
//         console.log("settimeout console print....")
//     },4000)  //why it takes alg se 4 sec??? kyuki JS engine stop interpreter at line 513(await vali line pr)
// }

// getData()
// OUTPUT:
// promise resolved
// after return promise this functionality should be run....

// NOTE:esse agr await valli chiz bhut time le resolve hone me then uss case me call stack block ho jayega?
// hn hota h block lekin server related chize block nhi hoti h jesse dusri request bhejna and all...

// CONCLUSION: .then() cannot wait for response if age niche kuch console likha ho to vo phle print kr degi
        // BUT await literally stop the interpreter untill the response not get. and then run niche valle console


// using multiple await inside async
// function returnPromise(boo) {
//     let promise = new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             if(1 == boo) return resolve("promise resolved")
//             return reject("promise rejected")
//         },3000)
//     })
//     return promise
// }

// async function getData() {
//     let data = await returnPromise(true) 
//     console.log(data)
//     console.log("after return promise this functionality should be run....")
//     setTimeout(()=>{
//         console.log("settimeout console print....")
//     },3000)  

//     // IMPORTANT NOTE HERE: if promise return reject response then next or below lines are not run.
//     // ie output will be:
//     // promise resolved
//     // after return promise this functionality should be run....
//     // settimeout console print....
//     // Uncaught (in promise) promise rejected 

//     // let data2 = await returnPromise(false)  
//     // console.log(data2)
//     // console.log("after return promise2 this functionality should be run....")
//     // setTimeout(()=>{
//     //     console.log("settimeout2 console print....")
//     // },3000)  

//     let data3 = await returnPromise(true) 
//     console.log(data3)
//     console.log("after return promise3 this functionality should be run....")
//     setTimeout(()=>{
//         console.log("settimeout3 console print....")
//     },4000)  

//     // aur agr data2 ko remove kr de to output will be:
//     // promise resolved
//     // after return promise this functionality should be run....
//     // settimeout console print....
//     // promise resolved
//     // after return promise3 this functionality should be run....
//     // settimeout3 console print....
// }

// getData()


// typeError  vs SyntaxError vs ReferenceError
// console.log("runnnnnnn")
// console.log("runnnnnnn")
// const a = 5
// // a = 6    //here we get type error so the interpreter return a error and return back no line below execute
// console.log(b) // here we get referenceError so the interpreter return a error and return back no line below execute
// console.log("runnnnnnn")

// CONCLUSION:  in typeError and referenceError interpreter stop executing the code from that line and not execute below lines
        //  but in syntaxError interpreter not execute even the single line of code of javascript



// let create more complicated senario

// function returnPromise(boo) {
//     let promise = new Promise((resolve, reject)=>{
//         if(boo){
//             setTimeout(()=>{
//                 resolve("promise1 solved")
//             },5000)
//         }
//         else{
//             setTimeout(()=>{
//                 resolve("promise2 solved")
//             },10000)
//         }
//     })
//     return promise
// }

// async function getData() {
//     console.log("inside getData function console")
//     let data1 = await returnPromise(true)  //phle ye 5 sec lega resolve hone me 
//     console.log(data1)
//     console.log("promise1 console")

//     let data2 = await returnPromise(false)  //fir ye alg se 10 sec lega resolve hone me
//     console.log(data2)
//     console.log("promise2 console")
// }

// getData()

// console.log("after getData return")

// setTimeout(()=>{
//     console.log("ye print kb ho rha h???")
//     console.log("kya ye getData pura run hoga fir print hoga??")
// },2000)

// the output is :
// inside getData function console
// after getData return
// ye print kb ho rha h???
// kya ye getData pura run hoga fir print hoga??
// promise1 solved
// promise1 console
// promise2 solved
// promise2 console

// ab essa kyu ho rha h ?? phle to pura function print hona chahiye fir console aur setTimeout
//chlna chahiye lekin essa output kyu de rha h???

// ANSWER:==>kyuki JS engine kissi ke liye nhi rukta wo bss jesse hi await ko dekha vo uss function ko suspend kr deta h
//mtlb call stack se usko remove kr dega aur ab callstack khali h to getData() ke niche ki line execute hogi that why niche ke console 
//phle hi print ho gye before completing the full console in function getData()
// Note that:----------->ab suspend to kr diya legin jb await resolve hoga to vapis se JS engine uss function ko call stack me daal dega 
//aur jis line pr execution khtam kra tha vhi se start h jayega 


// function returnPromise(boo) {
//         let promise = new Promise((resolve, reject)=>{
//             if(boo){
//                 setTimeout(()=>{
//                     resolve("promise1 solved")
//                 },10000)
//             }
//             else{
//                 setTimeout(()=>{
//                     resolve("promise2 solved")
//                 },5000)
//             }
//         })
//         return promise
//     }
    
//     async function getData() {
//         console.log("inside getData function console")
//         let data1 = await returnPromise(true)  //phle ye 10 sec lega resolve hone me 
//         console.log(data1)
//         console.log("promise1 console")
    
// function returnPromise(boo) {
//         let promise = new Promise((resolve, reject)=>{
//             if(boo){
//                 setTimeout(()=>{
//                     resolve("promise1 solved")
//                 },10000)
//             }
//             else{
//                 setTimeout(()=>{
//                     resolve("promise2 solved")
//                 },5000)
//             }
//         })
//         return promise
//     }
    
//     async function getData() {
//         console.log("inside getData function console")
//         let data1 = await returnPromise(true)  //phle ye 10 sec lega resolve hone me 
//         console.log(data1)
//         console.log("promise1 console")
    
//         let data2 = await returnPromise(false)  //fir ye alg se 5 sec lega resolve hone me
//         console.log(data2)
//         console.log("promise2 console")
//     }
    
//     getData()
    
//     console.log("after getData return")
    
//     setTimeout(()=>{
//         console.log("ye print kb ho rha h???")
//         console.log("kya ye getData pura run hoga fir print hoga??")
//     },2000)
//         let data2 = await returnPromise(false)  //fir ye alg se 5 sec lega resolve hone me
//         console.log(data2)
//         console.log("promise2 console")
//     }
    
//     getData()
    
//     console.log("after getData return")
    
//     setTimeout(()=>{
//         console.log("ye print kb ho rha h???")
//         console.log("kya ye getData pura run hoga fir print hoga??")
//     },2000)

    // output is 
    // inside getData function console
    // after getData return
    // ye print kb ho rha h???
    // kya ye getData pura run hoga fir print hoga??
    // promise1 solved
    // promise1 console
    // promise2 solved
    // promise2 console

    // let extraAug = {
    //     location : "Indore",
    //     value : 100
    // }

   


//  fetch browser api :
    // using async/await
    // const API_URL = "https://dummyjson.com/products/1"

    // async function fetchDataAPI() {
    //     let responseObj = await fetch(API_URL)
    //     let resultData = await responseObj.json()
    //     console.log(resultData.brand)
    // }
    // fetchDataAPI()

    // using .then()
    // const API_URL = "https://dummyjson.com/products/1"

    // function fetchDataAPI() {
    //     fetch(API_URL).then((responseObj)=> responseObj.json()).then((resultData)=> console.log(resultData.brand))
    // }
    // fetchDataAPI()



    // error handling in async/await  
    // .then() me .catch() error ko handle krta tha but in async / await try{} and catch{} block handle the errors

    // const API_URL = "https://dummysjson.com/products/1"

    // async function fetchDataAPI() {
    //     try{
    //         let responseObj = await fetch(API_URL)
    //         let resultData = await responseObj.json()
    //         console.log(resultData.brand)
    //     }catch(err) {
    //         console.log(err)
    //     }
    // }
    // fetchDataAPI()


    


    // task given by vijendra sir to, make custom map function in javascript
    
     // Array.prototype.myMap = function(func, thisParam) {
    //     let resultArray = [];
        // for(let i=0; i<this.length; i++)
        // {
        //     resultArray.push(func(this[i], i, thisParam.location))
        // }
        // return resultArray

        // while
        // let i = 0;
        // while(i<this.length) {
        //     resultArray.push(func(this[i], i, thisParam.location))
        //     i++
        // }
        // return resultArray

        // do-while
        // let i = 0;
        // do{
        //     resultArray.push(func(this[i], i, thisParam.location))
        //     i++
        // }while(i<this.length);
        // return resultArray

        // for-in
        // for(let i in this)
        // {
        //     resultArray.push(func(this[i], i, thisParam.location))
        // }
        // return resultArray

        // for-of
        // for(let i of this)
        // {
        //     resultArray.push(func(i, this.indexOf(i), thisParam.location))
        // }
        // return resultArray

        // for-Each
        // this.forEach((val)=>{
        //     resultArray.push(func(val, this.indexOf(val), thisParam.location))
        // })
        // return resultArray

    // }


    // Arrow function
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

    // if(arr.length <= 0) return resultArray
    //     resultArray.push(func(arr[(arr.length)-1],(arr.length)-1))
    //     arr.pop()
    //     abc(func, arr)
    //     return resultArray


    // Recursion
    // let resultArray = [];
    // let i = 0;
    // Array.prototype.myMap = function abc(func, arr) {
    //     // console.log(arr.length)
    //     if(i >= arr.length) return resultArray
    //     resultArray.push(func(arr[i],i))
    //     i++
    //     abc(func, arr)
    //     return resultArray
    // }

    // let array = [1,2,3,4]
    // let objArr = [
    //     {myName : "promil", myCompany : "CIS"},
    //     {myName : "subh", myCompany : "TCS"},
    //     {myName : "raj", myCompany : "Qodeleaf"},
    // ]

    // array//
    // let returnArr = array.myMap((val,index)=>{
    //     // console.log(this) 
    //     return val*20*index 
    // },array)
    // console.log(returnArr)
    
    // array object//
    // let returnObjArray = objArr.myMap((val, index)=>{
    //     return val.myName + " " + val.myCompany + " " + index 
    // },objArr)
    // console.log(returnObjArray)

 