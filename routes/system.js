const express = require('express');
const router = express.Router();
const mysql = require('mysql') //引用mysql
const db = require('../config/db.js')
const $sql = require('../config/sqlMap.js')
let conn = mysql.createConnection(db.mysql)
let Token = require('../config/token.js')
// 定义一个返回变量的格式
let resData;
router.use((req, res, next) => {
    resData = {
        code: 'ok',
        message: ''
    }
    next()
})
//提交网站设置
router.post('/setInfo', (req, res) => {
    let sql = $sql.system.setSysInfo
    let params = req.body
    conn.query(sql, [params.title, params.topImg], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            resData.message = '保存成功！'
            res.json(resData)
        }
    })
})
router.get('/getInfo', (req, res) => {
    let sql = $sql.system.getSysInfo
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            if (result.length > 0) {
                resData.data = result[0];
            } else {
                resData.code = 'failed'
                resData.message = '没有更多数据了'
            }
            res.json(resData)
        }
    })
})

module.exports = router;