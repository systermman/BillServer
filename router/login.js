var express = require('express');

var router = express.Router();
var sql = require("../db/mysqlConnect");
var responseData;

router.use(function (req, res, next) {

    responseData = {
        code: 0,
        message: ''
    }
    next();
});


router.get('/', function (req, res) {

//获取前端传过来的参数
    let UserNo = req.query.UserNo;
    let UserImg = req.query.UserImg;
    let UserName = req.query.UserName;
    

   //链接数据库，执行存储过程
    let proc = "CALL PROC_lOGIN(?,?,?)";//存储过程名称
    let params = [UserNo, UserImg, UserName];//存储过程参数
    sql.query(proc, params, function (rows, fields) {
        console.log(rows);
        responseData.code = rows[0][0]["Code"];
        responseData.message = rows[0][0]["Message"];
        res.json(
            responseData
        )
    });

});
module.exports = router;