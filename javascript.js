// spread operator and destructuring operator

// spreading/////////
const isSummer = false;
const fruits = ["apple", "banana", ...(isSummer ? ["watermelon"] : [])];
const Fruits = ["apple", "banana", (isSummer ? ["watermelon"] : [])];
console.log(fruits) //['apple' , 'banana']
console.log(Fruits) //['apple', 'banana', Array(0)]

let array = [1,2,3,4,5]
let arrayObject = {...array}
console.log(arrayObject)  //{0: 1, 1: 2, 2: 3, 3: 4, 4: 5}

const isSummer = true;
const fruits = {
    apple: 10,
    banana: 5,
    watermelon: isSummer ? 30 : {},
  };

conditional spread operator
const fruits = {
    apple: 10,
    banana: 5,
    ...(isSummer ? { watermelon: 30 } : {}),
}

console.log(fruits)

//   spread powerfull point :
//   Overriding properties
// When one object is spread into another object, or when multiple objects are spread into one object,
// and properties with identical names are encountered, the property takes the last value assigned while remaining in the position it was originally set.

const object1 = {name:"promil", company:"cis"}
const object2 = {name:"promil jain", company:"GOogle", location:"pune"}

const newObject = {...object1, ...object2} 
console.log(newObject)  //{name: 'promil jain', company: 'GOogle', location: 'pune'}


destructuring ////
let array = [1,2,3,4,5]
let [a,b] = array
console.log(a) //1
console.log(b) //2

let array = [1,2,3,"promil","CIS"]
let [a,b,c,...info] = array
console.log(info)

const myObject = {
    name:"promil",
    locate:"indore",
    company:"CIS"
}

let {name, locate, company} = myObject

console.log(`my name is: ${name}, from ${locate}, working at ${company}`)

