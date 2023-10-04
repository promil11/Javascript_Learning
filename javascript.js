
// IMPORT EXPORT 
// import { myName,showName } from "./exportJavascript.js";

// console.log(myName)
// console.log(showName());

// import appName, {addition, substraction } from "./exportJavascript.js";
// console.log(appName)
// console.log(addition(5,7));
// console.log(substraction(5,7));

// time difference between hoisting and value assign is known as temporal dead zone
// three type of error :
// 1)ReferenceError
// 2)SyntaxError
// 3)TypeError

// ReferenceError--->
// console.log(x)
// let a = 10
// var b = 30

// SyntaxError
// let a = 10
// let a =20

// TypeError
// const  a;
// a = 5; 


//ClASS IN JAVASCRIPT 
// NOTE:The body of a class is executed in strict mode even without the "use strict" directive.
// NOTE:The body of a class is executed in strict mode even without the "use strict" directive.

// before ECMA6
// function pen(name,color,price)
// {
//     this.name = name
//     this.color = color
//     this.price = price
// }

// const pen1 = new pen("gel", "red", 500)
// console.log(pen1)

// //add function to pen1 object

// pen.prototype.showDetail = function(){
//     console.log(`${this.name},${this.color},${this.price}`)
// }

// console.log(pen1)
// pen1.showDetail()
// console.log(pen) //it will print pen function 


// after ECMA6 class concept come in picture
/////////////it is more understandable syntax of oops concept
// class Pen {
//     constructor(name,color,price){
//         this.name = name
//         this.color = color
//         this.price = price
//     }

//     showDetail(){
//         console.log(`${this.name},${this.color},${this.price}`)
//     }
// }

// const pen1 = new Pen("marker","blue","50rs")
// console.log(pen1.showDetail())
// console.log(Pen) //return full class
// console.log(Pen.showDetail()) //error Pen.showDetail is not a function
// //add function to pen1 object


// Declaration
// console.log(rectangleClass) // in let Cannot access 'rectangleClass' before initialization
//                             // and in var it return undefined
// class Rectangle {
//     constructor(height, width) {
//       this.height = height;
//       this.width = width;
//     }
//   } 

//   //expression with class name
// var rectangleClass = class Rectangle {
//     constructor(height, width) {
//       this.height = height;
//       this.width = width;
//     }
//   }
  
// console.log(rectangleClass)

//expression with anonymous class
// var rectangleClass = class  {
//     constructor(height, width) {
//       this.height = height;
//       this.width = width;
//     }
//     display() {
//         h = this.height;  //it will throw an errror because The body of a class is executed in strict mode even without the "use strict" directive.
//         w = this.width;

//         SOLUTION:
//         // let h = this.height; 
//         // let w = this.width;

//         console.log(h*w)
//     }
//   }
  
//   const classObject = new rectangleClass(5,6);
//   console.log(classObject.display())

// GETTER / SETTER 

// class Pen {
//     constructor(name,color){
//         this.name = name
//         this.color = color
//     }

//     get showDetail(){ //getter must have exactly zero parameters
//         console.log(`${this.name},${this.color},${this.price}`)
//     }

//     set setPrice(price){  //set exactly must have on formal parameter
//         this.price = price
//     }
// }

// const pen1 = new Pen("marker","blue")
// pen1.setPrice = 100
// console.log(pen1)

// delete pen1.showDetail
// console.log(pen1.showDetail) //delete getter function 


// direct add function
// class demo {
//      get getFunction()
//      {
//         console.log("getter function...")
//      }
// }

// const demoObject = new demo()
// console.log(demoObject)
// console.log(demoObject.getFunction)

// // add function using prototype
// class newDemo {

// }

// const newDemoObject = new newDemo()
// console.log(newDemoObject)

// newDemo.prototype.getNewFunction = function() {  //it act as a normal function in class
//     console.log("new getter function....")
// }
// console.log(newDemoObject.getNewFunction())

// // add function using defineProperty
// class defineClass {

// }

// const defineObject = new defineClass()
// console.log(defineObject)

// Object.defineProperty(defineObject, "defineFunction", {value: function(){console.log("add function by defineProperty")}})
// console.log(defineObject.defineFunction())


// set setter function in object using computed property name 
// const compLanguage = "myLanguage"
// const language = {
//     set [compLanguage](name){
//         this.myArray.push(name)
//     },
//     myArray:[]
// }

// language[compLanguage] = "c++"
// language[compLanguage] = "Javascript"
// console.log(language.myArray) //['c++',"javascript"]


// static method
                 // NOTE:
// 1)static member can be changeable
// 2)each class has its own container to store static data  and 
// if another class extend the parent class then child class have its own 
// container to store static member also refer to the container of the parent.  
// 3)if a static member are in parent and we try to access from child class then it first check
// to child static container and then referred to the parent static container 
//4)if we try to access static member having in child class from parent class then it will return undefined 
// 5)static method only call static member
class ClassWithStaticField {
    static staticField;
    static staticFieldWithInitializer = "static field";
    static staticField = "parentStatic"
    myName = "promil"

    // Calling static members from another static method
    static mtFunc(){
        console.log(this.myName) //it will return undefine
    }
  }
  
  class SubclassWithStaticField extends ClassWithStaticField {
    static subStaticField = "subclass field";
    static staticField = "childStatic";
    static subStaticField = "subclass field1";
  }
// console.log(SubclassWithStaticField.staticFieldWithInitializer)
// console.log(ClassWithStaticField.staticField)
// console.log(ClassWithStaticField.subStaticField)
// ClassWithStaticField.staticField = "changeparentmember"
// console.log(ClassWithStaticField.staticField)

// const newObject = new ClassWithStaticField()
// console.log(newObject.staticField) //we cannot access static member or method bu object only classname

const parentObject = new ClassWithStaticField()
console.log(parentObject)

const childObject = new SubclassWithStaticField()
console.log(childObject)

// parentObject.mtFunc // promil
ClassWithStaticField.mtFunc()





