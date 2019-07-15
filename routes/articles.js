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
			resData.data = result;
			res.json(resData)
		}
	})
})

//新建文章
router.post('/create',(req,res)=>{
	let sql = $sql.articles.createArticles;
	
})



module.exports = router;