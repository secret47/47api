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

/* GET users listing. */
router.get('/', function (req, res, next) {
	let sql = $sql.user.query
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
});

//用户注册
router.post('/reg', (req, res) => {
	let sql = $sql.user.regUser;
	let params = req.body;
	conn.query(sql, [params.username, params.password], (err, result) => {
		if (err) {
			console.log(err)
		}
		if (result) {
			resData.message = "注册成功！",
				res.json(resData)
		}
	})
})

//登录方法
router.post('/login', (req, res) => {
	let sql = $sql.user.login;
	let params = req.body;
	conn.query(sql, [params.username, params.password], (err, result) => {
		if (err) {
			console.log(err)
		}
		if (result) {
			//这就是看数据库中有没有数据和当前输入的一模一样
			//有的话，长度就不会为0
			if (result.length == 0) {
				resData.code = 'failed';
				resData.message = '登录失败';
				res.json(resData)
			} else {
				resData.message = '登录成功';
				let data = result[0];
				//添加token
				const token = Token.encrypt({ id: data.id}, '15d');
				resData.uid = data.id
				resData.token = token
				res.json(resData)
			}
		}
	})
})


//得到用户角色
router.get('/getInfo',(req,res)=>{
	let sql = $sql.user.queryInfo;
	let params = req.query;
	conn.query(sql,[params.uid],(err,result)=>{
		if(err){
			console.log(err)
		}
		if(result){
			console.log(result);
			resData.message = "查询成功"
			resData.data = result[0]
			res.json(resData)
		}
	})
})


//得到用户权限  admiun
router.get('/getRoles',(req,res)=>{
	let sql = $sql.user.queryRoles
	let params = req.query
	conn.query(sql,[params.uid],(err,result)=>{
		if(err){
			console.log(err)
		}
		if(result){
			console.log(result);
			resData.message = "查询成功"
			resData.data = result[0].rolesname
			res.json(resData)
		}
	})
})






module.exports = router;