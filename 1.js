//引入mongodb模块，获得客户端对象
var MongoClient = require('mongodb').MongoClient;
//连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/test';    


//定义函数表达式，用于操作数据库并返回结果
var GetData = function(db, callback) { 
    var db = db.db("test"); 
    //获得指定的集合 
    var collection = db.collection('test');
    collection. find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        //db.close();
    })
    
}

//使用客户端连接数据，并指定完成时的回调方法
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    GetData(db, function(result) {
        //显示结果
        console.log(result);
        //关闭数据库
        //db.close();
    });
});