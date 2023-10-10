// IMPORTANT LINKS
// https://www.javascripttutorial.net/javascript-this/
// https://www.javascripttutorial.net/javascript-anonymous-functions/
// https://www.javascripttutorial.net/javascript-arrow-function/



// // function a(){
//     function b() {
//         function c() {
//             console.log(this === window)  //true
//         }
//         c()
//     }
//     b()
// }
// a()


// let counter = {
//      count : 0,
//      incre : function () {
//         console.log(this === window) // false
//         console.log(this === counter) // true
//      }
// }

// counter.incre()

// "use strict"
// console.log(this === window) // in global execution context use strict and without use strict behave the same  return true


// function Car(brand) {
//     this.brand = brand;
// }

// Car.prototype.getBrand = function () {
//     console.log(this === car)  //true
//     return this.brand;
// }

// let car = new Car('Honda');
// console.log(car.getBrand());  //Honda


// function Car(brand){
//     this.brand = brand
//     console.log(this === window)
// }

// let bmw = Car("BMW")
// console.log(bmw.brand)  //TypeError: Cannot read properties of undefined (reading 'brand')


// function Car(brand) {
//     if(this instanceof Car)
//         {
//             this.brand = brand
//             this.getCar = function() {
//             return this.brand
//         }
//     }
//     else{
//         throw Error("Must use the new operator to call the funtion")
//     }
// }

// let car = new Car("honda")
// console.log(car.getCar())
// // let car = Car("honda")
// // console.log(car.getCar())

// function a(){

// }
// console.log(typeof a)


// let a = (function () {
//     console.log('anonymous function')
// })
// a()


// why we are not using two IIFE ????? because we are not using ; 
// (function (name) {
//     console.log('anonymous function ' + name)
// })("promil");

// (console.log)("console function");


// argument me object, function as a object  bhi pass kr shkte h

// let obj = {
//     name : "promil",
//     company : "CIS",
// };

// (function(myObj) {
//     console.log(myObj.name , myObj.company)
// })(obj);



// function abc() {
//     this.val = 15;
//     this.fun = function() {
//         console.log("fun function....")
//     }
// }

// let funObj = new abc();  //create a object of the function

// (function(funObj) {
//     console.log(funObj.val)
//     console.log(funObj.fun())
// })(funObj);


//named expression function
// let func = function myFun() {
//     console.log("named function called")
//     let innerFunc = myFun;
//     // console.log(innerFunc()) //create infinite loop 
// }
// func()
// myFun() // referenceError myFun is not defined because myFunc ko memory milli hi nhi



// arrow function
// function myFun(name) {
//     this.name = name
// }

// let myFunObj = new myFun("promil")
// console.log(myFunObj.name)


// let myConstructor = (name, company) => {
//     this.name = name
//     this.company = company
//     return {
//         name , company
//     }
// }

// let myFunObj =  myConstructor("promil", "CIS")
// console.log(myFunObj)  //return object
// console.log(myFunObj.name) //return promil
// console.log(myFunObj.company) //return CIS



// let add = (x,y) => x+y;
// console.log(typeof add)  //function
 

// let square = x => x*x;
// console.log(square(5))


// POINT BE NOTED:
// let myConstructor = (name) => {
//     return {
//         name : name
//     }
// }

// console.log(myConstructor("promil").name)

// function Car() {
//     this.speed = 0;

//     this.speedUp = function (speed) {
//         console.log(this === car)
//         this.speed = speed;
//         setTimeout(function () {
//             console.log(this === window) //true
//             console.log(this.speed); // undefined because inside settimeout vala function vo na apna ek agl hi execution conext  bna lega jo ki this refer krega window ko aur 
//             // window me speed search krega usko vha ni milega to undefined return krega
//         }, 1000);

//     };
// }

// let car = new Car();
// car.speedUp(50);

// solution --->I
// function Car() {
//     this.speed = 0;

//     this.speedUp = function (speed) {
//         console.log(this === car)
//         let speedValue = speed  //closure help in 
//         setTimeout(function () {
//             console.log(speedValue); // 50
//         }, 1000);

//     };
// }

// let car = new Car();
// car.speedUp(50);
// let speedValue = speed

// solution- II using arrow function
// function Car() {
//     this.speed = 0;

//     this.speedUp = function (speed) {
//         console.log(this === car)
//         this.speed = speed;
//         setTimeout(() => {
//             console.log(this === window) //false
//             console.log(this === car) //true
//             console.log(this.speed); // 50 because inside settimeout vala arrow function vo na new execution conext  nhi bnayega jo ki this refer krega car k object
//             // ko hi krga and will print 50
//         }, 1000);

//     };
// }

// let car = new Car();
// car.speedUp(50);


// JavaScript arrow functions and the prototype property/////// IMPORTANT

// function myFun() {
//     console.log("normal function....")
// } 

// myFun() //normal function....

// // but what if --->
// console.log(myFun.hasOwnProperty('prototype')) //return true because When you define a function using a function keyword, the function has a property called prototype:


// let arrowFun = () => {
//     console.log("arrow function ....")
// }

// arrowFun()//arrow function ....

// // but what if --->
// console.log(arrowFun.hasOwnProperty('prototype')) //return false when we define a function using arrow function then arrow functions don’t have the prototype property:


//just for show in the console a setTimeOut (async) naam ka container call stack me push ho jayega
// setTimeout(function() {
//     console.log("timer")
//     let x = 5;
//     function inner() {
//         console.log(x)
//     }
//     inner()
// }, 4000)

// function x(y) {
//     console.log("x is called")
//     y()
// }

// x(function y() {
//     console.log("y is called")
// })


// callback
// function attachEvent() {
//     let count = 0
//     document.getElementById("btn").addEventListener('click', function counterFun() {
//         console.log("button clicked", count++)
//     });
// } 
// console.log("heyy")
// attachEvent()


// TASK to find the odd number in array numbers

// function isOdd(num) {
//     return num%2 != 0
// }
// function filter(numArray, oddFun) {
//     let resultArray = []
//     for(let number of numArray) {
//         if(oddFun(number))resultArray.push(number)
//     }
//     return resultArray
// }

// let numbers = [1,2,4,7,3,5,6]

// let oddNumber =  filter(numbers, isOdd);
// console.log(oddNumber)


// asynchronous callback

// function download(url) {
//     setTimeout(()=>{
//         console.log("downloading completed..", url)
//     },1000)
// }

// function process(url){
//     console.log("processing done...", url)
// }

// let url = 'https://wwww.javascripttutorial.net/pic.jpg';

// download(url)
// process(url)
// output:
// processing done... https://wwww.javascripttutorial.net/pic.jpg
// javascript.js:306 downloading completed.. https://wwww.javascripttutorial.net/pic.jpg
// wrong execution what we want first download the image and then processing
//  the image but what is happening first process the image and then download

// solution===>using callback

// function download(url, callBackFun) {
//     setTimeout(()=>{
//         console.log("downloading completed..", url)
//         callBackFun(url)
//     },1000)
// }

// function process(url){
//     console.log("processing done...", url)
// }

// let url = 'https://wwww.javascripttutorial.net/pic.jpg';
// download(url, process)
// output:
// downloading completed.. https://wwww.javascripttutorial.net/pic.jpg
// javascript.js:334 processing done... https://wwww.javascripttutorial.net/pic.jpg


// higher order function
// let radiusArray = [3,2,5,4];

// function calculateArea(radius) {
//     return Math.PI * radius * radius
// }

// function calculateCircumference(radius) {
//     return 2 * Math.PI * radius
// }

// function calculateDiameter(radius) {
//     return 2 * radius
// }

// function calculate(radiusArray, callbackFun) {
//     let resultArray = []
//     for(let val of radiusArray){
//         resultArray.push(callbackFun(val))
//     }
//     return resultArray
// }

// console.log(calculate(radiusArray, calculateArea))
// console.log(calculate(radiusArray, calculateCircumference))
// console.log(calculate(radiusArray, calculateDiameter))


// TASK for map and filter
// we have to apply map on object Array
// const users = [
//     {firstName : 'promil' , lastName : 'jain', age : 23},
//     {firstName : 'subhi' , lastName : 'jain', age : 24},
//     {firstName : 'papa' , lastName : 'don', age : 49},
// ]
// const outputs = users.map((obj)=>{
//     // let first, last;
//     // for(let val in obj){
//     //     if(val == 'firstName')first = obj[val]
//     //     if(val == 'lastName')last = obj[val]
//     // }
//     // return first + " " + last
//     //mintos ki goli khaoooooo hahahaha....
//     return obj.firstName + "  " + obj.lastName
// }) 

// console.log(outputs)


// find the number of people have a same age make then an Object
// const users = [
//         {firstName : 'promil' , lastName : 'jain', age : 23},
//         {firstName : 'subhi' , lastName : 'jain', age : 24},
//         {firstName : 'papa' , lastName : 'don', age : 49},
//         {firstName : 'raj' , lastName : 'sharma', age : 23},
//         {firstName : 'chotu' , lastName : 'eee', age : 23},
//         {firstName : 'golu' , lastName : 'ppp', age : 49},
//         {firstName : 'molu' , lastName : 'kkk', age : 24},
//     ]

//     const userObject = users.reduce(function(acc, curr){  //here curr me ek ek object aayega
//         if(acc[curr.age]){
//             acc[curr.age] = ++acc[curr.age];
//         }else{
//             acc[curr.age] = 1
//         }
//         return acc
//     },{})

//     console.log(userObject)

//     //sum of all num in array
//     let arrayNum = [1,2,3,4,5]

//     let result = arrayNum.reduce(function(acc, curr) {
//         acc = acc + curr
//         return acc
//     },0)
//     console.log(result)