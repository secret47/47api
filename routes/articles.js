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


//得到分类
router.get('/getCatalogs',(req,res)=>{
	let sql = $sql.articles.queryCatalogs
	conn.query(sql, (err, result) => {
		if (err) {
			console.log(err)
		}
		if (result) {
			console.log(result);
			if(result.length>0){
				resData.data = result;
			}else{
				resData.message ="暂时没有分类"
			}
			res.json(resData)
		}
	})
})

//查询文章列表(未分页)
router.get('/getList',(req,res)=>{
	let sql = $sql.articles.queryArticles
	conn.query(sql, (err, result) => {
		if (err) {
			console.log(err)
		}
		if (result) {
			if(result.length>0){
				resData.data = result;
			}else{
				resData.message ="暂时没有文章"
			}
			res.json(resData)
		}
	})
})


//新建文章
router.post('/create',(req,res)=>{
	let sql = $sql.articles.createArticles;
	let params = req.body;
	conn.query(sql,[params.title,params.author,params.cid,params.content,params.createDate] ,(err, result) => {
		if (err) {
			console.log(err)
		}
		if (result) {
			console.log(result);
			let aid = result.insertId;
			resData.data = {'aid':aid}
			resData.message = "创建成功"
			res.json(resData)
		}
	})
})

//删除文章

//修改文章





module.exports = router;