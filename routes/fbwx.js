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

function getUserByName(sql,arr,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,arr,function(err,result){
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
router.get('/fbwx', function(req, res) {
    var passname=req.query["passname"];
    var name=req.query["name"];
    var img=req.query["img"];
    var txt=req.query["txt"];
    var address=req.query["address"];
    var tel=req.query["tel"];
    var sql = 'insert into weixiu (passname,name,img,txt,address,tel) values (?,?,?,?,?,?)';
    getUserByName(sql,[passname,name,img,txt,address,tel],function (a,b) {
        res.send(b)
        /*if(b!=""){
            res.send({num:'1'});
        }else if(b==""){
            res.send({num:'0'});
        }*/
    });
});

module.exports = router;