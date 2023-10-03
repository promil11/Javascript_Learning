
// closure  -->combination of function with its lexical environment is called closure

// function x()
// {
//     let a = "promil jain";

//     function y()
//     {
//         console.log(a);
//     }

//     a = "subhi jain";
//     return y; 
// }
// another cornercase
// function x()
// {
//     let a = "promil jain";

//     function y()
//     {
//         let b = "Smart";
//         function z()
//         {
//             console.log(a,b); //purvajo ke baare me bhi yaad rakhta h
//         }
//         return z;
//     }

//     a = "subhi jain";
//     return y();
// }

// const returnFunction = x();
// returnFunction();  //here note that after x function return y it will remove from the call stack 
//                    //but still y remember the lexical environment variable that means it return 
//                    //function along with lexical environment ie(closure)



//currying --> currying is the technique to convert a function of n arguments into n functions
                                                                                                                                               // function sendEmail(to,subject,body)
// {
//     console.log(`Email send to: ${to} with subject: ${subject} having body: ${body}`);
// }

// sendEmail("promiljain11@gmail.com","offer letter","Congratulation promil... you are selected in Amazon");

// this is called curring-->
// function sendEmail(to)
// {
//     return function subject(subject)
//     {
//         return function body(body)
//         {
//             console.log(`Email send to: ${to} with subject: ${subject} having body: ${body}`);
//         }
//     }
// }
// sendEmail("promiljain11@gmail.com")("offer letter")("Congratulation promil... you are selected in Amazon")
// console.log("END");
