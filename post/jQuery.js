$(function(){

    //load() in jquery
    // $("button").click(function(){
    //         $(".dataAdd").load('https://jsonplaceholder.typicode.com/todos/2',function(data,status,xhr){
    //         if(status == 'success')console.log("data loaded successfully")
    //         else console.log("error",xhr.statusCode(),xhr.statusText)
    //     })
    // })
    


    //ajax() in jquery
    // $("button").click(function(){
    //     $.ajax({
    //         url:'https://jsonplaceholder.typicode.com/todos/5',
    //         success:function(data, status, xhr){
    //             console.log( JSON.stringify(data), status)
    //             console.log(data.title)
    //             $(".dataAdd").html(data.title)
                
    //         },
    //         error: function(){
    //             console.log(error)
    //         }
    //     })


    //get() in jquery
    // $(function(){
    //     $('button').click(function(){
    //         $.get('https://jsonplaceholder.typicode.com/todos/1', function(data,status){
    //             console.log(data)
    //             alert('data-title: '+data.title + '\nstatus: '+status)
    //         })
    //     })
    // });
    // })



    // not working/////////////// because post method only work on server side not client side
    // $("button").click(function(){
    //     $.post("postData.js",
    //     {
    //         name: "promiljain",
    //     },
    //     function(data,status){
    //         console.log(data,'data',status,'status')
    //         console.log("message: " + data + "\nstatus: " + status);
    //     }).fail(function(response) {
    //         console.log('Error: ' + response);
    //     });
    // })

});