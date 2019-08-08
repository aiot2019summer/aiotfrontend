client.on('message', (topic, message) => {
    data1_String = message.toString();
    data1 = data1_String.replace(/'/g,'"');
    data1 = JSON.parse(data1);
     var a=0;
     var c=" ";  //设置当前人员数量程度
     if(a===0){
         c="无人"
     }
     else if(a<3||a===3){
         c="少"
     }
     else if(a>3&&a<5){
         c="一般"
     }
     else{
         c="多"
     }
    var b = document.getElementById('dc');//获取div的节点
    b.innerHTML = c;//在div节点上显示c的值
})