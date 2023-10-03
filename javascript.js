
// Call, Apply, Bind, Map, Filter, Reduce, Splice, Slice

    // //call
    // const person1 = {
    //     fName : "promil",
    //     lName : "jain",
    //     showFullName : function(company, hometown){
    //         console.log(this.fName + " " + this.lName + company + hometown );
    //     }
    // }

    // const person2 = {
    //     fName : "tanu",
    //     lName : "jain",
    // }

    // console.log(person1.showFullName()); //promil jain
    
    // console.log(person1.showFullName.call(person2, "amazon" , "indore")); //tanu jain



     //apply
//    const person1 = {
//         fName : "promil",
//         lName : "jain",
//         showFullName : function(company, hometown){
//             console.log(this.fName + " " + this.lName + " "+ company +" " + hometown );
//         }
//     }

//     const person2 = {
//         fName : "tanu",
//         lName : "jain",
//     }


//     console.log(person1.showFullName.apply(person2, ["amazon" , "indore"])); //tanu jain amazon indore



//bind
//    const person1 = {
//         fName : "promil",
//         lName : "jain",
//         showFullName : function(company, hometown){
//             console.log(this.fName + " " + this.lName + " "+ company +" " + hometown );
//         }
//     }

//     const person2 = {
//         fName : "tanu",
//         lName : "jain",
//     }

    
//     const result = person1.showFullName.bind(person2, ["amazon" , "indore"]);
//     // console.log(result); //return full copy of function 
//     result();


// Map , Filter, Reduce are array method
//map 
// 1) Not manipulate the original array
// 2) create new array and copy all manipulate element into it
    // const array1 = [2,3,1,4,8,7,9];
    // const newArray = array1.map((element)=>{
    //     return element*2;
    // })
    // console.log(newArray);
    // console.log(array1);


//filter
// 1) Not manipulate the original array
// 2) create new array and copy all manipulate element into it
// const array2 = [3,2,5,4,7,1];
// const newArray = array2.filter((element)=>{
//    return element%2==0; 
// })
//   console.log(array2);
//   console.log(newArray);


//reduce
// const array3 = [3,2,4,1,7,8,7];
// const answer = array3.reduce((sum,value)=>{
//     return sum+value;
// },0)
// console.log(answer);
    

//slice 
// 1) Not manipulate the original array
// const array = ["promil", "tanu", "aali", "raj"];
// const returnArray = array.slice(0,2);
//   console.log(array);
//   console.log(returnArray);


//splice
// 1) manipulate the original array
// 2)we can delete,replace,push element by splice method
// const array = ["promil","ali","raj","amman"];

//delete:
// array.splice(1,1);
// console.log(array);

//replace
// array.splice(1,1,"tanu");
// console.log(array);

// push
// array.splice(1,0,"tanu");
// console.log(array);
