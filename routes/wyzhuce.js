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
function getUserByName(zt,zc,xiaoqu,callback){
    pool.getConnection(function(err,connection){
        var sql = 'insert into login (zt,zc,xiaoqu) values (?,?,?)';
        connection.query(sql,[zt,zc,xiaoqu],function(err,result){
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
router.get('/wyzhuce', function(req, res) {
    var zt='1';
    var zc=req.query["zc"];
    var xiaoqu=req.query["xiaoqu"];
    getUserByName(zt,zc,xiaoqu,function (a,b) {
        if(b!=""){
            res.send({num:'1'});
        }else if(b==""){
            res.send({num:'0'});
        }
    });
});

module.exports = router;