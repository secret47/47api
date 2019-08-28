const express = require('express');
const router = express.Router();
const db = require('../config/db.js')
const $sql = require('../config/sqlMap.js')
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
    db.query(sql, [params.title, params.topImg], (result, fields)  => {
        if (result) {
            resData.message = '保存成功！'
            res.json(resData)
        }
    })
})
router.get('/getInfo', (req, res) => {
    let sql = $sql.system.getSysInfo
    db.query(sql, (result, fields)  => {
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

router.get('/newRemark',(req,res)=>{
     let sql = $sql.system.getNewRemark
    db.query(sql, (result, fields)  => {
        if (result) {
            if (result.length > 0) {
                resData.data = result
            } else {
                resData.code = 'failed'
                resData.message = '没有更多数据了'
            }
            res.json(resData)
        }
    })
})

module.exports = router;