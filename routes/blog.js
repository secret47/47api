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
//查询文章列表(未分页)
router.get('/getList', (req, res) => {
    let currentPage = req.query.currentPage || 1;
    let pageSize = req.query.pageSize || 10
    let sql = 'SELECT * FROM article,catalog where article.cid = catalog.id limit ' + pageSize + ' offset ' + pageSize * (currentPage - 1);
    // let sql1 = 'SELECT found_rows() AS rowcount;'
    conn.query(sql, [currentPage, pageSize], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result)
            if (result.length > 0) {
                resData.data = result;
            } else {
                resData.code = 'failed'
                resData.message = '没有更多数据了'
            }
            res.json(resData)
        }
    })
})
//得到上一页数据
router.get('/getPre', (req, res) => {
    let sql = $sql.blog.queryPre;
    let aid = req.query.aid
    conn.query(sql, [aid], (err, result) => {
        console.log()
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result,'上一页')
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
//得到下一篇
router.get('/getNext', (req, res) => {
    let sql = $sql.blog.queryNext;
    let aid = req.query.aid
    conn.query(sql, [aid], (err, result) => {
        console.log()
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result,'下一页')
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