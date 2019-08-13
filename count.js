client.on('message', (topic, message) => {
    data1_String = message.toString();
    data1 = data1_String.replace(/'/g,'"');
    data1 = JSON.parse(data1);
     var c=" ";  //设置当前人员数量程度
     var bg=" "
     if(people===0){
         c="无人"
         bg="scroll_level_1"
     }
     else if(people<3||people===3){
         c="少"
         bg="scroll_level_2"
     }
     else if(people>3&&people<5){
         c="一般"
         bg="scroll_level_3"
     }
     else{
         c="多"
         bg="scroll_level_4"
     }
    var b = document.getElementById('dc');//获取div的节点
    b.innerHTML = c;//在div节点上显示c的值
    document.getElementById('dc').className = bg;
})