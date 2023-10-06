$(function(){


    let username = false;
    let email = false;
    let phone = false;
    let mainpassword = false;
    let confirmpassword = false;

    //validate username
    $("#username").keyup(function(){
        username = userName()
    })
    function userName(){
        let username = $("#username").val().trim();
        if(username.length == ""){
            $("#div1").addClass("error")
            $("small").text("Must contain User name field").css({"font-size":"16px"})
            return false
        }
        else if(username.length<10) {
            $("#div1").addClass("error")
            $("small").text("User name at least contain 10 letters").css({"font-size":"16px"})
            return false
        }
        else {
            $("#div1").removeClass("error")
            $("#div1").addClass("success")
            return true
        }
    }


    //validate Email
    $("#email").keyup(function(){
          email = emailFun()
    })
    function emailFun(){
        let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        let email = $('#email').val()
        // console.log(email)
        if(regex.test(email)){
            // console.log("true")
            $("#div2").removeClass("error")
            $("#div2").addClass("success")
            return true
        }
        else{
            $("#div2").addClass("error")
            $("small").text("Email must contain @, .com").css({"font-size":"16px"})
            return false
        }
    }


    //validate phone number
    $("#phonenumber").keyup(function(){
       phone = phoneNumber()
    })
    function phoneNumber(){
         // console.log(number)
         let numReg = new RegExp(/^[789]\d{9}$/);
         let number = $('#phonenumber').val()
         if(numReg.test(number)){
             $("#div3").removeClass("error")
             $("#div3").addClass("success")
             return true
         }
         else{
             $("#div3").addClass("error")
             $("small").text("must be contain 10 letter").css({"font-size":"16px"})
             return false
         }
    }

    //valid password
    let mainPassword;
    $("#password").keyup(function(){
        mainpassword =  mainPasswordFun()
    })
    function mainPasswordFun(){
        let passReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        let myPassword = $('#password').val()
        if(passReg.test(myPassword)){
            $("#div4").removeClass("error")
            $("#div4").addClass("success")
            mainPassword = myPassword
            return true
        }
        else{
            $("#div4").addClass("error")
            $("small").text("Minimum eight characters, at least one letter, one number and one special character").css({"font-size":"16px"})
            return false
        }
    }


    //password check validation
    $("#confirmpassword").keyup(function(){
         confirmpassword = confirmPassword()
    })
    function confirmPassword(){
        let confirmPassword = $("#confirmpassword").val()
        console.log(confirmPassword)
        if(confirmPassword == mainPassword){
            $("#div5").removeClass("error")
            $("#div5").addClass("success")
            return true
        }
        else{
            $("#div5").addClass("error")
            $("small").text("confirm password is not match with password").css({"font-size":"16px"})
            return false;
        }
    }



    $("#submit").click(function(e){
        e.preventDefault()
        console.log(confirmpassword,mainpassword,phone,email,username)
        if(username && email && phone && mainpassword && confirmpassword)
        {
            $(".displayDiv").text("User Registered Successfully").css({"font-size":"16px", "color": "green", "text-align":"center"})
            $("#username").val("")
            $('#email').val("")
            $('#phonenumber').val("")
            $('#password').val("")
            $("#confirmpassword").val("")
            $("#div5,#div4,#div3,#div2,#div1").removeClass("success")
        }
        else{
            $(".displayDiv").text("must Contain above fields").css({"font-size":"16px" , "color": "red", "text-align":"center"})
        }
    
    })
})