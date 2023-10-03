// Array
// const array = ["promil", 48, true, null, undefined, ["arrayInside", 1], {company:"GOOGLE"}, function developer(){console.log("I become a great developer");}];
// console.log(Array.isArray(array));//true
// console.log(array[3]); //null
// console.log(array[4]); //undefined
// console.log(array[5]); //again unbdefine because apart from array size index if we want any other indices value then it will return undefined
// console.log(array[-2]); //undefined
// console.log(array[[7]]());

// for(let i = 0; i < array.length; i++)
// {
//     console.log("the array elements is " + array[i]);
// }

// deepCopy and shallowCopy array
                    // /deep copy
// let newArray;
// newArray = array;
// console.log(newArray);
// console.log(array);
// console.log(newArray[7]); //return f developer(){}


// delete(newArray[7])
// console.log(newArray);
// console.log(array);
// console.log(newArray[7]); //return undefined
// after delete the newArray index by delete keyword the length of newArray and array are same as before deleting
//  but the notice is after chnde in newArray old array also changed ie deep copy
                
                //  shallow copy
// let newArray ;
// newArray = [...array];
// console.log(newArray);
// console.log(array);

// delete(newArray[7])
// console.log(newArray); 
// console.log(array);
// after changing in newArray wont affect on old array


// const arrayString = array.toString()
// console.log(arrayString);


// practise to show list in html
// let formate = "<ul>"
// for(let i=0; i<array.length; i++)
// {
//     formate += "<li> " +array[i]+ " </li>"
// }
// formate += "</ul>"
// const list = document.getElementById("show_list");
// list.innerHTML = formate ; 



// OBJECT

// 1)using create constructor:
// The Object.create() static method creates a new object, using an 
// existing object as the prototype of the newly created object.
// const person = {
//     isHuman: false,
//     printIntroduction: function () {
//       console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//     },
//   };

// const newPerson = Object.create(person)
// const newPerson2 = Object.create(person)

// newPerson.isHuman = true; //this will not change the original object

// console.log(person); 
// console.log(newPerson);
// console.log(newPerson.printIntroduction()); //have the ability to inherit the properties of existing object

// newPerson2.name = "promil"
// console.log(newPerson2);

// CONCLUSION: 
// by using object.create constructor method to create object have inherite existing object properties
//  and also not affect the original object after changing in newly created properties


// 2)using literals:
// const userObject = {
//     name: "promil",
//     age: 23,
//     location: "indore",
//     "company name" : "cyber infrastructure"  //in this case we have to use userObject["company name"]
// }

// two way to access:
// a)using dot  ie userObject.name
// console.log(userObject.location);

// b)using array sign ie userObject[name]
// console.log(userObject["company name"]);

// IMPORTANT: Symbol datatype

// const mySymbol = Symbol("keySymbol")
// userObject[mySymbol] = "valueSymbol" //right it act as Symbol ie Symbol(keySymbol) = "valueSymbol"
// userObject.mySymbol = "valueSymbol" //wrong syntax it act as a new key value pair ie mySymbol : "valueSymbol"
// console.log(userObject);


// userObject.greeting = function () {
//     console.log(`hello ${this.name} in ${this["company name"]}`);
// }

// userObject.greeting()
// console.log(userObject); //greeting include automatically in userObject


// copy more then one object in newObject
// 1) method: using assign method:

// const object1 = {
//     name : "promil",
// }
// const object2 = {
//     company : "CIS",
// }

// const newObject = Object.assign({}, object1, object2)
// console.log(newObject);

// 2)method: using spread operator
// const object1 = {
//     name : "promil",
// }
// const object2 = {
//     company : "CIS",
// }

// const newObject = {...object1, ...object2}  //this is mostly used syntax
// console.log(newObject);



//deepCopy object and shallowcopy object
// const originalObject = {
//     name : "promax",
//     email : "promiljain@gmail.com",
//     app : "CycloneApp" 
// }

//deepCopy object
// const copyObject = originalObject;

// copyObject.name = "subhi"

// console.log(originalObject);
// console.log(copyObject);

//shallowcopy object
// const copyObject = {...originalObject};

// copyObject.name = "subhi"

// console.log(originalObject);
// console.log(copyObject);
