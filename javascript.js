// DOM MANIPULATION

// 1)accessing html element
// console.log(document.body)
// a)document.getElementById(ID)
// b)document.getElementsByClassName(classname) //return arrayof HTMLCollection
// c)document.getElementsByTagName(tagName)  //return arrayof HTMLCollection
// d)document.querySelector(id,classname,tagname);
// e)document.querySelectorAll(id,tagName,classname) //return arrayof NodeList


// const fetchSpecialClass = document.getElementsByClassName("special")
// console.log(fetchSpecialClass);

// const fetchNotSpecialClass = document.querySelectorAll(".container .notSpecial")
// console.log(fetchNotSpecialClass);

// const fetchAllDivTag = document.getElementsByTagName("div")
// console.log(fetchAllDivTag);


// 2)mordify HTML
// a)changing HTML contain using innerHTML
// const changeBox = document.getElementById("box-1")
// changeBox.innerHTML = "heyy Box1 i am changed...."

// a)changing attribute value
// const changeBox = document.getElementById("box-4")
// changeBox.style.color = "red"
// changeBox.id = "box-5"

// c)modify class in HTML
// const changeBox = document.getElementById("box-4")
// -->// changeBox.classList.add("newClass")
// -->// changeBox.classList.remove("notSpecial")

// -->//document.getElementById("toggle").addEventListener('click',()=>{
//     const changeBox = document.getElementById("box-4")
//     changeBox.classList.toggle("toggleClass")
// })

// d)Create and appending HTML element
// const newPara = document.createElement("p");
// newPara.innerText = "heyy this is new paragrapgh create by createChild and append by appendChild"

// const container = document.getElementById("container")
// container.appendChild(newPara)


// syntax, variable, comments, statements

// const/let a = 5;
// const/let b = a + 6;
// console.log(b);

// let person = "promil"
// carName = "AUDI"   //here js compiler gives an error carName is not define
// price = "100M"

// console.log("car name : " + carName + " owned by: " + person);

// solution is:

// let person = "promil"
// let carName = "AUDI"
// let price = "100M"

// console.log("car name : " + carName + " owned by: " + person);

// or you can write this:

// let person = "promil",
// carName = "AUDI",
// price = "100M"

// console.log("car name : " + carName + " owned by: " + person);

// const a = 5, b=6;  //its works a and b both are constant
// // b=7 //error const variables are not reassigned
// console.log(a+b)

// let b,c;
// let a=b=c=5;
// console.log(typeof(a))   //number
// console.log(a); //5

// only (A-Z or a-z or _ or $) are alowed for first letter in variable
// let 1promil = "promil" //throw error
// console.log(1promil) 

// javascript are case sensitive
// const myName = " promil ";
// const MyName = " subhi ";
// console.log(myName); //promil
// console.log(MyName); //subhi



// javascript DATATYPE:
// 1)Number
// 2)String
// 3)Boolean 
// 4)null
// 5)undefined
// 6)Array
// 7)Object


// // when decleared but not initialized then in this case it will show undefined
// let value;
// console.log(value) //undefined

// // when decleared and initialized with null keyword then in this case it will show null 
// let valueNew = null;
// console.log(valueNew); //null

// // IMPORTANT about NULL and undefined
// console.log(typeof(valueNew) == "null" ); 
// // return false because type of null is object

// console.log(typeof(undefined) == "undefined");
// // return true because type of undefined is undefined

// console.log(undefined == null) 
// // return true

// console.log(undefined === null) 
// // return false
