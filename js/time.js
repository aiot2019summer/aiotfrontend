function fnW(str) {
    var num;
    str >= 10 ? num = str : num = "0" + str;
    return num;
}
var timer = setInterval(function () {
    var date = new Date();
    var year = date.getFullYear(); //当前年份
    var month = date.getMonth(); //当前月份
    var data = date.getDate(); //天
    var hours = date.getHours(); //小时
    var minute = date.getMinutes(); //分
    var second = date.getSeconds(); //秒
    var day = date.getDay(); //获取当前星期几 
    switch(day){
        case 1:day="一";break;
        case 2:day="二";break;
        case 3:day="三";break;
        case 4:day="四";break;
        case 5:day="五";break;
        case 6:day="六";break;
        case 7:day="日";break;
    }
    var ampm = hours < 12 ? 'AM' : 'PM';
    $('#time').html(fnW(hours) + ":" + fnW(minute) + ":" + fnW(second));
    $('#date').html('<span>' + year + '年' + (month + 1) + '月' + data + '日' + '</span><span>' + ampm + '周' + day )

}, 1000)