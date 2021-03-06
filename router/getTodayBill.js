'use strict'
var express = require('express');

var router = express.Router();
var sql = require("../db/mysqlConnect");


router.get('/', function (req, res) {

//获取前端传过来的参数
    let UserNo = req.query.UserNo;
   

//链接数据库，执行存储过程
    let proc = "CALL PROC_GET_TODAY_BILL(?)";//存储过程名称
    let params = [UserNo];//存储过程参数
    sql.query(proc, params, function (rows, fields) {
        console.log(rows);
        let responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Message"];
        responseData.TodayCost = rows[1][0]["TodayCost"] == null ? 0 : rows[1][0]["TodayCost"];
        responseData.MonthCost = rows[2][0]["MonthCost"] == null ? 0 : rows[2][0]["MonthCost"];
        responseData.YearCost = rows[3][0]["YearCost"] == null ? 0 : rows[3][0]["YearCost"];
        let todayBillList = [];
        for (let key of rows[4]) {
            let list = {};
            list.UserNo = key["UserNo"];
            list.BillNo = key["BillNo"];
            list.SpendMoney = key["Money"] == null ? 0 : key["Money"];
            list.Purpose = key["Purpose"];
            list.PurposeIcon = key["PurposeIcon"];
            list.Remark = key["Remark"];
            todayBillList.push(list);
        }
        responseData.TodayRecordList = todayBillList;
        res.json(
            responseData
        )
    });

});
module.exports = router;
