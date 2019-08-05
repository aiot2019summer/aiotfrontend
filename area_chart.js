var data = [];
  var chart_2= new G2.Chart({
    container: 'area_chart',
    forceFit: true,
    width: 700,
    height: 350,  
    padding: [30, 5, 49, 0]
  });
  chart_2.source(data);
  chart_2.scale('people', {
    tickInterval: 5,
    min: 0,
    max: 20
  });
  chart_2.scale('time', {
    tickInterval: 1,
    min: 0,
    max: 35
  });

  chart_2.tooltip({
    crosshairs: {
      type: 'line'
    }
  });
  chart_2.area().position('time*people').color('l(100) 0:#FF7011 1:#FFA366').opacity(0.85);
  chart_2.line().position('time*people').color("red").size(3);

  //时间轴参数
  chart_2.axis('time', {
    label: null,
    line: {
      lineWidth: 0.5, // 设置线的宽度
      stroke: 'black', // 设置线的颜色  
    },
    tickLine: {
      lineWidth: 0.5,
      length: 10,
      stroke: 'black',
      alignWithLabel:true
    }
  });
  //人数轴参数
  chart_2.axis('people', {
    line: {
      lineWidth: 0.5, // 设置线的宽度
      stroke: 'black', // 设置线的颜色  
    },
    tickLine: {
      lineWidth: 0.5,
      length: 10,
      stroke: 'black',
      alignWithLabel:true
    },
    grid:null
  });
  chart_2.render();
  var HighestNum=0;
  //接收到新数据后，push进data
  client.on('message', (topic, message) => {
    
    data_String = message.toString();
    data_temp = data_String.replace(/'/g,'"');
    data_temp = JSON.parse(data_temp);
    var people = data_temp.length - 1;
    //计算最高人数
    if(people>HighestNum){
      HighestNum=people;
    }
    data_temp = data_temp.slice(data_temp.length - 1, data_temp.length)
    data_temp[0].people = people;
    data.push(data_temp[0]);
    console.log(data);
    //顺便更新一下网页上的人数信息
    document.getElementById('TotalPeople').innerHTML = people;
    document.getElementById('CurrentPeople').innerHTML = people;
    document.getElementById('HighestNum').innerHTML = HighestNum;
    if(data.length>=2){
      document.getElementById('ChangeofNum').innerHTML = (data[data.length-1].people)-(data[data.length-2].people);
    }
    if(data.length<2){
      document.getElementById('ChangeofNum').innerHTML = (data[data.length-1].people)-0;
    }

    //重新绘图
    chart_2.changeData(data);
  })