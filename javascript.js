
// USE STRICT MODE//////////
// 1)"use strict"
// let x =7;
// delete  x //delete of an variable in  strict mode are not allowed  it gives an error

// 2) "use strict"
// myName = "promil"  
// console.log(myName)  //its give an error myName is not define

// 3)"use strict"
// function sum(x,x)
// {
//     console.log(x+x) //duplicate parameter name are not allowed in this context
// }

// sum(6,5)


// IMPORTANT POINT
// The this keyword in functions behaves differently in strict mode.

// The this keyword refers to the object that called the function.

// If the object is not specified, functions in strict mode will return undefined and functions in normal mode will return the global object (window):
// 4)"use strict"
// function myFun() {
//     console.log(this)  //print undefined
// }
// myFun();


// 5)we can add use strict mode particular function also
// x=5;
// function myFun()
// {
//     "use strict"
//     y=6;
//     console.log(y)
// }
// console.log(x)  //print 5
// myFun()  //error y is not defined


// "use strict"
// myFunc()
// console.log(x)  

// function myFunc() {
//     console.log("working...")
// }

// var x = 10 //undefined
// let x = 10 //cannot accessed before initialising


//spread operator and rest operator
//spread
// const array =[1,2,3,4,"promil"]
// console.log(...array)  //1 2 3 4 'promil'  basically spread values

// rest
// function  myFunc(...args){
//     console.log(args)  //when ... are used in parameter then it is rest operator and return array ie [1,4,3,6,5]
//     let sum=0
//     for(let i of args ){
//         sum +=  i;
//     }
//     return sum
// }

// console.log(myFunc(1,4,3,6,5))


// TASK -->product first two value and rest are addition 
// const array =[3,2,4,1,5]

// const [val1, val2, ...sumValues] = array
// // console.log(...sumValues)  //4 1 5
// // console.log(sumValues)  //[4,1,5]

// function product(a,b) {
//     return a*b;
// }

// function sum(...sumValues)
// {
//     let s=0;
//     // console.log(...sumValues) //4 1 5
//     // console.log(sumValues)   //[4,1,5]
//     for(let i of sumValues)
//     {
//         s += i;
//     }
//     return s;
// }

// // console.log(product(val1,val2)) //6
// // console.log(sum(...sumValues))  //10

// let arrayResult = [product(val1,val2), sum(...sumValues)]
// console.log((arrayResult))  //[6,10]


// IMPORTANT NOTE :
// ENUMERABLE   meaning that a property can be viewed if it is iterated using the for-in loop
// : Properties that are created using the defineProperty() method have the enumerable flag set to false.


// LOOP IN javascript:

// function myFunc(...arguments){
//     for(let i of arguments)console.log(i)
// }

// myFunc(1,2,3,4)


// OBJECT
// let myObject = {
//     name: "promil",
//     company: "CIS",
//     age: 23,
//     location: "Indore",
//     innerObject: {
//         fullName: "promil jain",
//         inter: "qodeleaf",
//         location: "bhopal",
//     },
//     car: "audi"
// }

// 1 case:  for-in can we use in object 
// for(let key in  myObject)
// {
//     console.log(`${key} : ${myObject[key]}`)
// } 

// 2 case: for-of cannot we use in object because for-of are only applicable in iterating object ie array, string, map, set
// for(let key of  myObject)
// {
//     console.log(`${key} : ${myObject[key]}`)
// }

// 3 case: but there is syntax where we are using for-of in object
// for(let [key,value] of Object.entries(myObject))
// {
//     console.log(`${key} : ${value}`)
// }


// ARRAY
// const array = [3,4,"subhi",5,1,"promil"]
// for(let i in array)console.log(i) //print index --> 0 1 2 3 4 5

// const Array = [3,4,"subhi",5,1,"promil"]
// for(let i of Array)console.log(i) //print values of index 3 4 "subhi" 5 1 "promil"


//STRING
// const stringValue = "GOOGLE"
// for(let i in stringValue)console.log(i) // 0 1 2 3 4 5

// const stringValue = "GOOGLE"
// for(let i of stringValue)console.log(i) // G O O G L E




// EXTRA KNOWLEDGE
// let myObject = {
//     name: "promil",
//     company: "CIS",
//     age: 23,
//     location: "Indore",
//     innerObject: {
//         fullName: "promil jain",
//         inter: "qodeleaf",
//         location: "bhopal",
//     },
//     car: "audi"
// }

// defineProperty() method
// // by default enumerable is true but we can set enumerable by defineProperty method
// Object.defineProperty(myObject, "innerObject", {
//     enumerable : false
// })
// // now it will hide not display in loop

// for(let i in myObject)
// {
//     console.log(myObject[i])
// } 
// console.log(myObject)
// ie print promil CIS 23 Indore audi


// propertyIsEnumerable() method
// console.log(myObject.propertyIsEnumerable("innerObject"))  //true

// getOwnPropertyDescriptors() method
// const allProperty = Object.getOwnPropertyDescriptors(myObject)
// console.log(allProperty) 
// return configurable, enumerable, value, writable