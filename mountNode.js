function count(data){
    sum=data.length;
    var new_data =
    [{item: ' 出口'
    }, {
     item: '大厅'
    },{
    item:'食堂入口'
    }];               //设置三个范围
    var x1=200,y1=800,count1=0;
    var x2=900,y2=800,count2=0,count3=0;
    for (var i = 0; i < data.length; i++) {
        if((data[i].x < x1)&&(data[i].y < y1)){  
         count1++;
        }
        else if((data[i].x > x2)&&(data[i].y < y2)){
         count2++;
        }
        else{count3++};
    }       //分别计算三个范围内的人员数量
    console.log(count1);
    console.log(count2);
        new_data[0].percent=count1/sum;
        new_data[1].percent=count2/sum;
        new_data[2].percent=1-(count1/sum)-(count2/sum);
        new_data[0].count=count1;
        new_data[1].count=count2;
        new_data[2].count=count3;
    return new_data;  //得到三个范围内人员分布情况
    }
              
    var data = [{
        item: '入口',
        count: 0,
        percent: 0
      }, {
        item: '大厅',
        count: 0,
        percent: 0
      }, {
        item: '出口',
        count: 0,
        percent: 0
      }]; //初始化data数组
    
      //开始画图
      var chart_2 = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        height: 200,
        width:200,      //设置图形的大小
        animate: false
      });       
      chart_2.source(data, {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
            return val;
          }
        }
      });
      chart_2.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart_2.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // 辅助文本
      chart_2.guide().html({
        position: ['50%', '50%'],
        html: '<div style="color:#FFFFFF;font-size: 14px;text-align: center;width: 10em;"><br><span style="color:#8c8c8c;font-size:20px"></span></div>',
        alignX: 'middle',
        alignY: 'middle'
      });
      var interval = chart_2.intervalStack().position('count').color('item').size(20)
         .label('count', {
             textStyle:{fill:'white',fontSize:'15' }, //设置lable的颜色和大小
             formatter: function formatter(count, item) {
                 return item.point.item + ': ' +count+ '人';    //设置lable的内容
             }
         }).style({lineWidth: 1,stroke: '#fff' });//设置线的颜色和大小
    
      chart_2.render();
      interval.setSelected(data[0]);
       
          client.on('message', (topic, message) => {
        data1_String = message.toString();
        data1 = data1_String.replace(/'/g,'"');
        data1 = JSON.parse(data1);
        var data1=[{x:100,y:50},{x:300,y:40},{x:100,y:80},{x:1000,y:90}];
        var sum=data1.length;
        data2=count(data1);
        chart_2.changeData(data2);
          })