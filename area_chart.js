var data_2 = [{"time":0,"people":0}];
var chart_2= new G2.Chart({
  container: 'area_chart',
  forceFit: true,
  width: 700,
  height: 350,  
  padding: [15, 20, 120, 30]
});
chart_2.source(data_2);
chart_2.scale('people', {
  tickInterval: 5,
  min: 0,
  max: 10
});
chart_2.scale('time', {
  tickInterval: 10,
  min: 0,
  max: 60
});

chart_2.tooltip({
  crosshairs: {
    type: 'line',     
  },
  showTitle: false,
  shared: false
});
chart_2.area().position('time*people').color('l(100) 0:#FF7011 1:#FFA366').opacity(0.85);
chart_2.line().position('time*people').color("red").size(3);

//时间轴参数
chart_2.axis('time', {
  line: {
    lineWidth: 2, // 设置线的宽度
    stroke: 'white', // 设置线的颜色  
  },
  subTickCount: 5,
  subTickLine: {
    length: 3,
    stroke: 'white',
    lineWidth: 1
  },
  grid: {
    type: 'line',
    lineStyle: {
      stroke: 'white',
      lineWidth: 2,
      lineDash: [ 4, 4 ]
    }
  },
  label:{
    textStyle:{
      textAlign: 'center', // 文本对齐方向，可取值为： start middle end
      fill: '#FFFF', // 文本的颜色
      fontSize: '20', // 文本大小
      fontWeight: 'bold', // 文本粗细
    }
    
  } 
});
//人数轴参数
chart_2.axis('people', {
  line: {
    lineWidth: 2, // 设置线的宽度
    stroke: 'white', // 设置线的颜色  
  },
  tickLine:null,
 // grid:null,
  label:{
    offset:15,
    textStyle:{
      textAlign: 'center', // 文本对齐方向，可取值为： start middle end
      fill: '#FFFF', // 文本的颜色
      fontSize: '20', // 文本大小
      fontWeight: 'bold', // 文本粗细
    }
    
  }  
});
chart_2.render();
var HighestNum=0;
//接收到新数据后，push进data
client.on('message', (topic, message) => {
  
  data_2_String = message.toString();
  data_2_temp = data_2_String.replace(/'/g,'"');
  data_2_temp = JSON.parse(data_2_temp);
  people = data_2_temp.length - 1;
  //计算最高人数
  if(people>HighestNum){
    HighestNum=people;
  }
  data_2_temp = data_2_temp.slice(data_2_temp.length - 1, data_2_temp.length)
  data_2_temp[0].people = people;
  data_2.push(data_2_temp[0]);
  //顺便更新一下网页上的人数信息
  document.getElementById('TotalNum_1').innerHTML = people;
  document.getElementById('TotalNum_2').innerHTML = people;
 // document.getElementById('TotalNum_4').innerHTML = people;
  document.getElementById('HighestNum').innerHTML = HighestNum;
  if(data_2.length>=2){
    document.getElementById('ChangeofNum').innerHTML = (data_2[data_2.length-1].people)-(data_2[data_2.length-2].people);
  }
  if(data_2.length<2){
    document.getElementById('ChangeofNum').innerHTML = (data_2[data_2.length-1].people)-0;
  }

  //重新绘图
  chart_2.changeData(data_2);
})