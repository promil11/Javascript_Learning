const hElement = document.getElementById("heading");
console.log(hElement)
alert(hElement.innerHTML);


const jsonText = `{
    "browsers": {
      "firefox": {
        "name": "Firefox",
        "pref_url": "about:config",
        "releases": {
          "1": {
            "release_date": "2004-11-09",
            "status": "retired",
            "engine": "Gecko",
            "engine_version": "1.7"
          }
        }
      }
    }
  }`;
  
//   /parse
  console.log(JSON.parse(jsonText));
  const parsedData = JSON.parse(jsonText);

  console.log(parsedData.browsers.firefox.releases[1].release_date)

stringify
  const stringifyData = JSON.stringify(jsonText)
  console.log(stringifyData)
  console.log(jsonText)

const jsonText = `{
    "browsers": {
      "firefox": {
        "name": "Firefox",
        "pref_url": "about:config",
        "releases": {
          "1": {
            "release_date": "2004-11-09",
            "status": "retired",
            "engine": "Gecko",
            "engine_version": "1.7",
            "name":{
                "name1" : "promil",
                "name2" : "subhi"
            }
          }
        }
      }
    }
  }`;


//   mst chis h yrrrr... ye key value callback
 JSON.parse(jsonText, (key,value)=>{
    typeof value === 'object' ? console.log(1) : console.log(2); 
    typeof value === 'object' ? console.log(key) : console.log(value); ///perform recursively
    // output will be-->Firefox
    // script.js:59 about:config
    // script.js:59 2004-11-09
    // script.js:59 retired
    // script.js:59 Gecko
    // script.js:59 1.7
    // script.js:59 promil
    // script.js:59 subhi
    // script.js:59 name
    // script.js:59 1
    // script.js:59 releases
    // script.js:59 firefox
    // script.js:59 browsers
    // script.js:59 
    // script.js:64 no error
    // script.js:69 continue....
})
output is : display 2 8times  and 1 6times


console.log("no error")

// a+b  -->js compiler ither hi ruk jayega kyu ki reference error
//  h aur aage nhi print krega  lekin syntax error deta to phli line me hi ruk jata

console.log("continue....")



const jsonText = {
    "browsers": {
      "firefox": {
        "name": "Firefox",
        "pref_url": "about:config",
        "releases": {
          "1": {
            "release_date": "2004-11-09",
            "status": "retired",
            "engine": "Gecko",
            "engine_version": "1.7",
            "name":{
                "name1" : "promil",
                "name2" : "subhi"
            }
          }
        }
      }
    }
  };

myNewObject = {"name" : "promil"};
myNewObject.contain_full_info = jsonText;
console.log(myNewObject);

myNewObject.name = "subhi" //it will change name value
console.log(myNewObject.name)   //will show subhi 



//////shallow and deep copy of object

var oldObject = {
     "name " : "promil",
     "company" : "CIS"
}

var newObject = oldObject; //deep copy of an object
var newObject = {...oldObject}; //shallow copy of an object


newObject.company = "GOOGLE"

console.log(newObject.company)
console.log(oldObject.company)


// save data to local storage /////////////////

document.getElementById("btnS").addEventListener('click',()=>{
    let getInputName = document.getElementById("inputName").value;
    let getInputEmail = document.getElementById("inputEmail").value;
    let objectInfo = {"name" : getInputName, "email" : getInputEmail}
    let infoDetail = JSON.stringify(objectInfo)
    localStorage.setItem("name",getInputName);
    localStorage.setItem("email",getInputEmail);
    localStorage.setItem("fullInfo",infoDetail);  ///save data as stringify object
    document.getElementById("inputName").value="";
    document.getElementById("inputEmail").value="";
    console.log("input successfully saved in localStorage")
})

document.getElementById("btnG").addEventListener('click',()=>{
     let getNameData = localStorage.getItem("name")
     let getEmailData = localStorage.getItem("email")
     let getFullInfo = JSON.parse(localStorage.getItem("fullInfo"))
     console.log(getNameData)
     console.log(getEmailData)
     console.log(getFullInfo.name) //if we dont parse then it will give undefine
     document.getElementById("firstLi").innerHTML = getNameData;
     document.getElementById("secondLi").innerHTML = getEmailData;

})


/fetch api//////////////

document.getElementById("btn").addEventListener('click',()=>{
    const URL = "https://jsonplaceholder.typicode.com/posts";
    fetch(URL).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data)
    })
})

let data;
document.getElementById("btn").addEventListener('click',async ()=>{
    const URL = "https://jsonplaceholder.typicode.com/posts";
    const res = await fetch(URL)
    data = await res.json();
    console.log('data', data);
})
