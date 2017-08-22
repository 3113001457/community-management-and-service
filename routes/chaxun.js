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
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/**/
function getUserByName(passname,callback){
    pool.getConnection(function(err,connection){
        var sql = 'select * from login where passname=?';
        connection.query(sql,[passname],function(err,result){
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
router.get('/chaxun', function(req, res) {
    var passname=req.query["passname"];
    getUserByName(passname,function (a,b) {
        if(b==""){
            res.send({"num":"1"});
        }else{
            res.send({"num":"0"});
        }
    });
});

module.exports = router;