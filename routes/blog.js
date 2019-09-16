const express = require('express');
const router = express.Router();
const db = require('../config/db')
const $sql = require('../config/sqlMap.js')
let Token = require('../config/token.js')
// 定义一个返回变量的格式
let resData;
router.use((req, res, next) => {
    resData = {
        code:'200',
        message: ''
    }
    next()
})
//查询文章列表
router.get('/getList', (req, res) => {
    console.log("文章端，列表")
    let currentPage = req.query.currentPage || 1;
    let pageSize = req.query.pageSize || 10
    let sql = 'SELECT aid,title,description,tags,cname,createDate FROM article,catalog where article.cid = catalog.id limit 10 '
    let sql1 = 'SELECT found_rows() AS rowcount;'
    db.query(sql, [currentPage, pageSize], (result, fields) => {
        if (result) {
            if (result.length > 0) {
                resData.data = result
            } else {
                resData.code = '300'
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
    db.query(sql, [aid], (result, fields) => {
        if (result) {
            if (result.length > 0) {
                resData.data = result[0];
            } else {
                resData.code = '300'
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
    db.query(sql, [aid], (result, fields)  => {
        if (result) {
            if (result.length > 0) {
                resData.data = result
            } else {
                resData.code = '300'
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
    db.query(sql, [aid], (result, fields)  => {
        if (result) {
            console.log(resData,'+++下一篇')
            if (result.length > 0) {
                resData.data = result
            } else {
                resData.code = '300'
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
    db.query(sql, [aid], (result, fields)  => {
        if (result) {
            if (result.length > 0) {
                resData.data = result
            } else {
                resData.code = '300'
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
    db.query(sql, [params.nickname, params.contact, params.container, params.aid], (result, fields)  => {
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
    getYear().then(result => {
        result.map(v => {
            getList(v.year).then(result1 => {
                v.articleList = result1;
            }).catch(err => {
                console.log(err)
            })
        })
        setTimeout(() => {
            resData.data = result
            res.json(resData)
        }, 300);
    }).catch(err => {
        console.log(err)
    })
})

function getYear() {
    let sql = $sql.blog.queryYear;
    return new Promise((resolve, reject) => {
        conn.query(sql, (result, fields)  => {
            if (err) {
                reject(err)
            }
            if (result) {
                resolve(result)
            }
        })
    })
}

function getList(year) {
    let sqlForYear = $sql.blog.queryForYear;
    return new Promise((resolve, reject) => {
        conn.query(sqlForYear, [year], (result, fields)  => {
            if (err) {
                reject(err)
            }
            if (result) {
                resolve(result)
            }
        })
    })
}

//得到分类
router.get('/getCatalogs', (req, res) => {
    let sql = $sql.articles.queryCatalogs
    db.query(sql, (result, fields)  => {
        if (result) {
            if (result.length > 0) {
                resData.data = result;
            } else {
                resData.code = '300'
                resData.message = "暂时没有分类"
            }
            res.json(resData)
        }
    })
})
module.exports = router;