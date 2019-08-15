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
//查询文章列表
router.get('/getList', (req, res) => {
    let currentPage = req.query.currentPage || 1;
    let pageSize = req.query.pageSize || 10
    let sql = 'SELECT * FROM article,catalog where article.cid = catalog.id limit 10 '
    // let sql1 = 'SELECT found_rows() AS rowcount;'
    conn.query(sql, [currentPage, pageSize], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
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
//根据id得到文章
router.get('/getArticles', (req, res) => {
    let sql = $sql.articles.queryForId
    let aid = req.query.aid
    conn.query(sql, [aid], (err, result) => {
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
//得到上一页数据
router.get('/getPre', (req, res) => {
    let sql = $sql.blog.queryPre;
    let aid = req.query.aid
    conn.query(sql, [aid], (err, result) => {
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
//得到下一篇
router.get('/getNext', (req, res) => {
    let sql = $sql.blog.queryNext;
    let aid = req.query.aid
    conn.query(sql, [aid], (err, result) => {
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
//得到当前文章的所有评论
router.get('/queryRemark', (req, res) => {
    let sql = $sql.blog.queryRemark;
    let aid = req.query.aid
    conn.query(sql, [aid], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            if (resData.length > 0) {
                resData.data = result
            } else {
                resData.code = 'failed'
                resData.message = '没有更多数据了'
            }
            res.json(resData)
        }
    })
})
//提交评论
router.post('/referRemark', (req, res) => {
    let sql = $sql.blog.referRemark
    let params = req.body
    conn.query(sql, [params.nickname, params.contact, params.container, params.aid], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            resData.message = '留言成功！'
            res.json(resData)
        }
    })
})
//查询文章列表(未分页)
router.get('/getAllList', (req, res) => {
    let sql = $sql.blog.queryYear;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result)
            if (result.length > 0) {
                let data = result
                console.log(data)
                data.forEach(item => {
                    let year = item.year;
                    let list = getList(year);
                    console.log(list)
                    item.articleLists = list
                })
                console.log(data)
                resData.data = data
            } else {
                resData.code = 'failed'
                resData.message = '没有更多数据了'
            }
            res.json(resData)
        }
    })
})

function getList(year,callback) {
    let sqlForYear = $sql.blog.queryForYear;
    conn.query(sqlForYear, [year], (err1, result1) => {
       calback(result1)
    })
}
module.exports = router;