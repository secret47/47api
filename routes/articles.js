const express = require('express');
const router = express.Router();
const db = require('../config/db')
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
//得到分类
router.get('/getCatalogs', (req, res) => {
    let sql = $sql.articles.queryCatalogs
    db.query(sql, (result, fields)  => {
        if (result) {
            if (result.length > 0) {
                resData.data = result;
            } else {
                resData.message = "暂时没有分类"
            }
            res.json(resData)
        }
    })
})
//查询文章列表(未分页)
router.get('/getList', (req, res) => {
    let currentPage = req.query.currentPage || 1;
    let pageSize = req.query.pageSize || 10
    let sql = 'SELECT * FROM article,catalog where article.cid = catalog.id limit ' + pageSize + ' offset ' + pageSize * (currentPage - 1);
    // let sql1 = 'SELECT found_rows() AS rowcount;'
    db.query(sql, [currentPage, pageSize], (result, fields)  => {
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
//新建文章
router.post('/create', (req, res) => {
    let sql = $sql.articles.createArticles;
    let params = req.body;
    db.query(sql, [params.title, params.author, params.cid, params.desc, params.coverImg, params.tags, params.content, params.createDate], (result, fields)  => {
        if (result) {
            let aid = result.insertId;
            resData.data = {
                'aid': aid
            }
            resData.message = "创建成功"
            res.json(resData)
        }
    })
})
//删除文章
router.post('/del', (req, res) => {
    let sql = $sql.articles.delete;
    let param = req.body
    db.query(sql, [param.aid], (result, fields)  => {
            if(result){
            if (result.length == 0) {
                resData.code = 'failed';
                resData.message = "没有找到你的文章哦~";
                res.json(resData)
            } else {
                resData.message = "删除成功！"
                res.json(resData)
            }
        }
    })
})
//修改文章
router.post('/update', (req, res) => {
    let sql = $sql.articles.update;
    let params = req.body;
    db.query(sql, [params.title, params.cid, params.content, params.aid], (result, fields)  => {
        if (result) {
            console.log(result);
            resData.message = "更改成功"
            res.json(resData)
        }
    })
})
//根据id得到文章
router.get('/getArticles', (req, res) => {
    let sql = $sql.articles.queryForId
    let aid = req.query.aid
    db.query(sql, [aid], (result, fields)  => {
        if (result) {
            console.log(result,'得到文章')
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
//新增分类
router.post('/addCatalog', (req, res) => {
    let sql = $sql.articles.addCatalog
    let cname = req.body.cname
    let cdesc = req.body.cdesc
    db.query(sql, [cname, cdesc], (result, fields)  => {
        if (result) {
            resData.message = '添加成功！'
            res.json(resData)
        }
    })
})
//删除分类
router.get('/delCatalog', (req, res) => {
    let sql = $sql.articles.delCatalog
    let id = req.query.id
    db.query(sql, [id], (result, fields)  => {
        if (result) {
            resData.message = '删除成功！'
            res.json(resData)
        }
    })
})
//新建标签
router.post('/newTags', (req, res) => {
    let sql = $sql.articles.addTags;
    let name = req.body.name;
    db.query(sql, [name], (result, fields)  => {
        if (result) {
            console.log(result)
            resData.message = '创建标签成功'
            res.json(resData)
        }
    })
})
//得到所有的标签
router.get('/getTags', (req, res) => {
    let sql = $sql.articles.queryTags;
    db.query(sql, [], (result, fields)  => {
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
//查询(不分页)  根据标题查询   模糊查询
router.get('/searchForTitle', (req, res) => {
    let sql = $sql.articles.searchForTitle
    let title = req.query.title
    title = '%' + title + '%'
    db.query(sql, [title], (result, fields)  => {
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

module.exports = router;