var express = require('express');
var router = express.Router();
var mysql=require("mysql");

var pool = mysql.createPool({
    host:'192.168.43.153',
    user:'root',
    password:'hyj321321hyj',
    database:'community',
    port:3306,
    connectionLimit:600
});

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/**/
function getUserByName(passname,password,zt,zc,xiaoqu,callback){
    pool.getConnection(function(err,connection){
        var sql = 'insert into login (passname,password,zt,zc,xiaoqu) values (?,?,?,?,?)';
        connection.query(sql,[passname,password,zt,zc,xiaoqu],function(err,result){
            if(err){
                console.log("ERRor:"+err.message);
                return;
            }
            connection.release();
            callback(err,result);
        })
    })
}
/* GET users listing. */
router.get('/zhuce', function(req, res) {
    var passname=req.query["passname"];
    var password=req.query["password"];
    var zt=req.query["zt"];
    var zc=req.query["zc"];
    var xiaoqu=req.query["xiaoqu"];
    getUserByName(passname,password,zt,zc,xiaoqu,function (a,b) {
        if(b!=""){
            res.send({num:'1'});
        }
    });
});

module.exports = router;