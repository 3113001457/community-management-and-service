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
function getUserByName(passname,password,zc,callback){
    pool.getConnection(function(err,connection){
        var sql = 'update login set passname=? , password=? where zc=?';
        connection.query(sql,[passname,password,zc],function(err,result){
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
router.get('/xiugai', function(req, res) {
    var passname=req.query["passname"];
    var password=req.query["password"];
    var zc=req.query["zc"];
    getUserByName(passname,password,zc,function (a,b) {
        if(b!=""){
            res.send({num:'1'});
        }else if(b==""){
            res.send({num:'0'});
        }
    });
});

module.exports = router;