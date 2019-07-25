var express=require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser'); 
var DB_CONN_STR = 'mongodb://localhost:27017/test';
var app =express();

//引用bodyParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
var data=[];

//定义函数表达式，用于操作数据库并返回结果
MongoClient.connect(DB_CONN_STR, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var db = db.db("test");
    db.collection("test"). find({}).toArray(function(err, dbdata) { // 返回集合中所有数据
        if (err) throw err;
        data=dbdata;
    });
});

//接口123
app.get('/123',function(req,res){
    res.status(200),
    res.json(data)
    });

//配置服务端口
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
    })
