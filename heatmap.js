function change(data) {
    var newList = [];
    var map = {};

    for (var i = 0; i < data.length; i++) {
      var m = 10; //图像横轴以m为间隔,纵轴以m为间隔分割成一个个区间
      var new_data = data;      
      new_data[i].g = parseInt(data[i].x / m); //获取x所属区间的行索引
      new_data[i].l = parseInt(data[i].y / m);//获取y所属区间的列索引
    }
  

    for (var i = 0; i < new_data.length; i++) {
      var obj = new_data[i];
      if ((!(map[obj.g])) && (!(map[obj.l]))) {
        newList.push({
          g:m* obj.g,
          l:m*obj.l,
          tmp: 1
        });
        map[obj.g, obj.l] = obj;
      }//将不重复元素放入obj中
      else {
        for (var j = 0; j < newList.length; j++) {
          if ((newList[j].g == m*obj.g) && (newList[j].l == m*obj.l)) {
            newList[j].tmp++;
            break;
          }
        }
      }
    }

    return newList;
  }
//因为如没有初始数据就画图，会出现背景位置、大小不对的问题（未解决），现先给一个0值绘图使其正常
  var data_1=[{"g":0,"l":0,"tmp":0}];
  //为了将数据与图片上的位置完全吻合，需要将横轴和纵轴的范围设定为数据对应范围，并将范围优化处理关闭
  var defs = {
    'g': {
      type: 'linear',
      min: 0,
      max: 1440,
      nice: false//优化处理关闭
    },
    'l': {
      type: 'linear',
      min: 0,
      max: 1080,
      nice: false//优化处理关闭
    }
  };
      
  var chart_1 = new G2.Chart({
      container: 'heatmap',
      forceFit: true,
      width:1440,
      height: 518,
      padding: [34, 0, 33, 0]
    });

  
  chart_1.coord().reflect();//坐标上下翻转
  chart_1.source(data_1,defs);
  chart_1.tooltip({
    showTitle: false
  });
  chart_1.axis(false);
  chart_1.legend({
    offset: 10
  });
  chart_1.heatmap().position('g*l').color('tmp',
  '#00FFCC-#00FF99-#00FF66-#00FF33-#00FF00-#33FF00-#33FF00-#66FF00-#99FF00-#CCFF00-#33FF00-#FFFF00-#FFCC00-#FF9900-#FF6600-#FF3300-#FF0000')
  .size(30);
  
  chart_1.render();
  //收到数据后刷新
  client.on('message', (topic, message) => {
    data_1_String = message.toString();
    data_1 = data_1_String.replace(/'/g,'"');
    data_1 = JSON.parse(data_1);
    if(data_1.length>1){
     data_1 = change(data_1);
    }
    else {
      data_1=[{"g":0,"l":0,"tmp":0}]; 
      }
    data_1.unshift({"g":-100,"l":-100,"tmp":7});
    data_1.unshift({"g":-200,"l":-100,"tmp":-5});
    chart_1.changeData(data_1);
  
  })