$(function(){
    clockUpdate()
    setInterval(clockUpdate, 1000)
})

function clockUpdate(){
    let date = new Date()

    function setHour(hour){
        if(hour <= 12)return hour
        else if(hour > 12) {
            hour = hour - 12 
            if(hour == 12)return hour - 12 
            return hour
        }
    }

    function setZero(val){
        if(val<10) val = '0' + val
        return val
    }

    let h = setZero(setHour(date.getHours()))
    let m = setZero(date.getMinutes())
    let s = setZero(date.getSeconds())
    $(".clockDiv").text(h + ":" + m + ":" + s)
}