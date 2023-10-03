// Map/////////////
// the map function create a new instances with the result of calling function on every element in the calling array

// 1)Map in Array
// const array = [5,3,7,2,9];

// function manipulate(){
//     let arrayResult = array.map((value)=>{
//         return value*2;
//     })
//     return arrayResult
// }

// const finalResult = manipulate();
// console.log(finalResult) //return array
// for(let i in finalResult)console.log(finalResult[i]) //10 6 14 4 18


// 2)map in Object
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
// it is not directly we are using map on object throw error myObject.map is not a function
// function manipulateObject() {
//     const arrayResult = myObject.map((value)=>{
//         return value;
//     })
//     return arrayResult
// }

// const finalResult = manipulateObject()
// console.log(finalResult)

// SOLUTION:IMPORTANT
// function manipulateObject() {
//     const  arrayResult = Object.keys(myObject).map((key)=>{
//         return myObject[key]
//     })
//    return arrayResult
// }
// const finalResult = manipulateObject()
// for(let i in finalResult)console.log(finalResult[i])



// SET/////
// const setObject = new Set([1,1,2,3,5])  iska mtlb 0th index pr ek array h

// console.log(setObject.delete(5)) //some method you can see from prototype in console
// console.log(setObject)

//1) for(let value of setObject)console.log(value) //iteration in set for-of

//2) const setResult = setObject.forEach((value)=>{ //iteration in set foreach 
//     console.log(value)
// })
// console.log(setResult) //forloop doesn't return anything ie undefined


// const setObject = new Set()  

// setObject.add({name : "promil", company : "CIS"})
// setObject.add(2)
// setObject.add([1,1,2,3,5])

// console.log(setObject) //{{object},2,array(5)}  iska mtlb 0th index pr object , 1th index pr 2 ,2nd index pr array

// for(let value of setObject)console.log(value)  //{name: 'promil', company: 'CIS'}  2  [1, 1, 2, 3, 5]


//MAP//////  get and set method  
// const  mapObject = new Map()
// mapObject.set('name',"promil") //set the key value in map
// mapObject.set('company',"CIS")
// mapObject.set('a',48)
// mapObject.set("myObject",{
//         name: "promil",
//         company: "CIS",
//         age: 23,
//         location: "Indore",
//         innerObject: {
//             fullName: "promil jain",
//             inter: "qodeleaf",
//             location: "bhopal",
//         },
//         car: "audi"
//     })

// console.log(mapObject) //{'name' => 'promil', 'company' => 'CIS', 'a' => 48}
// console.log(mapObject.get('name'))   //promil   //to get value through hashkey

// mapObject.delete('a') //delete an hashkey from map
// console.log(mapObject)

// console.log(mapObject.get('myObject').location) //Indore 



// Find, FindIndex, keys, endsWith, startsWith///////

//1) const myArray = [2,6,4,7,5,8]
// const result = myArray.find((number)=>{
//     if(number>6)return number;
// })
// console.log(result)


// QUESTION:How to find an object in an Array of objects?
// a)using find() 
// b)using findIndex()
// c)using filter()

// const carList = [{ id:13, brand: "BMW", model: "X5", price:"$23000", release_date:"2015-10-12"},

//                  { id:9, brand: "Audi", model: "S3", price:"$35000", release_date:"2013-08-23"},

//                  { id:11, brand: "Bugatti", model: "Veyron", price:"$500000", release_date:"2006-02-10"},
                 
//                  { id:7, brand: "VW", model: "Polo", price:"$80000", release_date:"2018-05-03"},
                
//                  { id:4, brand: "Fiat", model: "Punto", price:"$60000", release_date:"2017-01-25"},
                 
//                  { id:12, brand: "Audi", model: "S6", price:"$45000", release_date:"2018-08-23"}
//                 ];

                // b)using findIndex()
// const searchIndex = carList.findIndex((car)=> car.model=='Polo')
// console.log(carList[searchIndex].release_date)

                // a)using find() 
 
// const searchFind = carList.find((car)=>car.price > "$23000")
// console.log(searchFind)


// Array.filter() to find multiple objects
// const searchFilter = carList.filter((car)=> car.price > "$35000")
// console.log(searchFilter)   //return array of object

// end With and start With
// The endsWith() method of String values determines whether a string 
// ends with the characters of this string, returning true or false as appropriate.
// const myArray = [1,2,3,4,5]  //error  myArray.endsWith is not a function 
// console.log(myArray.endsWith('5'))

// const myString = "promil jain  "
// console.log(myString.endsWith('jain')) //false
// console.log(myString.endsWith(' ')) //true


// The startsWith() method of String values determines whether this string begins with 
// the characters of a specified string, returning true or false as appropriate.

// const myString = "promil jain  "
// console.log(myString.startsWith('promil')) //true
// console.log(myString.startsWith('jain',7)) //true