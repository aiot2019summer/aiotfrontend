var data_3 = [{
  position: '食堂',
  count: 5,
  percent: 0.5
  }, {
  position: '大厅',
  count: 5,
  percent: 0.5
  }
];
var chart_3 = new G2.Chart({
  container: 'donut_chart',
  forceFit: true,
  height: 280,
  animate: false
});
chart_3.source(data_3, {
  percent: {
    formatter: function formatter(val) {
      val = val * 100 + '%';
      return val;
    }
  }
});
chart_3.coord('theta', {
  radius: 0.75,
  innerRadius: 0.6
});
chart_3.tooltip({
  showTitle: false,
  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
});
  // 辅助文本
chart_3.guide().html({
  position: ['50%', '50%'],
  html: '<div style="color:white;font-size: 14px;text-align: center;width: 10em;">总人数<br><span style="color:white;font-size:20px" id="TotalNum_3"></span>人</div>',
  alignX: 'middle',
  alignY: 'middle'
});
var interval = chart_3.intervalStack().position('percent').color('position',['#13c2c2','#1890ff','#facc14']).label('percent', {
  formatter: function formatter(val, position) {
    return position.point.position + ': ' + val;
  },
  textStyle: { 
    fill: 'white', // 文本的颜色
    fontSize: '16', // 文本大小
    fontWeight: 'bold', // 文本粗细
  }}).tooltip('position*percent', function(position, percent) {
    percent = percent * 100 + '%';
    return {
    name: position,
    value: percent
    }}).style({
      lineWidth: 1,
      stroke: '#fff'
    });
chart_3.render();
interval.setSelected(data_3[0]);

// var cateen_count = 0;
// var hall_count = 0;
// var gate_count = 0;
// //食堂位置
// var canteen_left = ;
// var canteen_right = ;
// var canteen_bottom = ;
// var canteen_top = ;
// //大厅位置
// var hall_left = ;
// var hall_right = ;
// var hall_bottom = ;
// var hall_top = ;
// //门口位置
// var gate_left = ;
// var gate_right = ;
// var gate_bottom = ;
// var gate_top = ;

client.on('message', (topic, message) => {
  data_3_temp_String = message.toString();
  data_3_temp = data_3_temp_String.replace(/'/g,'"');
  data_3_temp = JSON.parse(data_3_temp);
//   for(var i=0;i<data_3_temp.length-1;i++){
//     if((data_3_temp[i].x > canteen_left)&&(data_3_temp[i].x < canteen_right)&&(data_3_temp[i].y > canteen_bottom)&&(data_3_temp[i].y > canteen_top)){
//       cateen_count++;
//     }
//     if((data_3_temp[i].x > hall_left)&&(data_3_temp[i].x < hall_right)&&(data_3_temp[i].y > hall_bottom)&&(data_3_temp[i].y > hall_top)){
//       hall_count++;
//     }
//     if((data_3_temp[i].x > gate_left)&&(data_3_temp[i].x < gate_right)&&(data_3_temp[i].y > gate_bottom)&&(data_3_temp[i].y > gate_top)){
//       gate_count++;
//     }
//   }
//   data_3[0].count = cateen_count;
//   data_3[0].percent = cateen_count/people;
//   data_3[1].count = hall_count;
//   data_3[1].percent = hall_count/people;
//   data_3[2].count = gate_count;
//   data_3[2].percent = gate_count/people;

//   chart_3.changeData(data_3);

//   cateen_count = 0;
//   hall_count = 0;
//   gate_count = 0;
})