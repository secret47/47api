const express = require('express');
const router = express.Router();
const db = require('../config/db.js')
const $sql = require('../config/sqlMap.js')
let Token = require('../config/token.js')
// 定义一个返回变量的格式
let resData;
router.use((req, res, next) => {
    resData = {
        code: '200',
        message: ''
    }
    next()
})

//用户注册
router.post('/reg', (req, res) => {
    let sql = $sql.user.regUser;
    let params = req.body;
    db.query(sql, [params.username, params.password], (result, fields)  => {
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
    db.query(sql, [params.username, params.password], (result, fields)  => {
        if (result) {
            console.log(result)
            //这就是看数据库中有没有数据和当前输入的一模一样
            //有的话，长度就不会为0
            if (result.length == 0) {
                resData.code = '300';
                resData.message = '登录失败';
                res.json(resData)
            } else {
                resData.message = '登录成功';
                let data = result[0];
                //添加token
                const token = Token.encrypt({
                    id: data.id
                }, '15d');
                resData.data = {
                    uid: data.id,
                    token: token
                }
                res.json(resData)
            }
        }
    })
})
//得到用户信息
router.get('/getInfo', (req, res) => {
    let sql = $sql.user.queryInfo;
    let params = req.query;
    db.query(sql, [params.uid], (result, fields)  => {
        if (result) {
            console.log(result);
            resData.message = "查询成功"
            let userInfo = result[0];
            resData.data = userInfo
            res.json(resData)
        }
    })
})
//得到用户权限  admiun
router.get('/getRoles', (req, res) => {
    let sql = $sql.user.queryRoles
    let params = req.query
    console.log('uid',params)
    db.query(sql, [params.uid], (result, fields)  => {
        if (result) {
            console.log(result);
            resData.message = "查询成功"
            resData.data = result[0].rolesname
            res.json(resData)
        }
    })
})
//更改用户信息
router.post('/updateInfo', (req, res) => {
    let sql = $sql.user.updateInfo;
    let params = req.body;
    db.query(sql, [params.avatarUrl, params.nickname, params.gender, params.age, params.description, params.birthday, params.uid], (result, fields)  => {
        if (result) {
            console.log(result);
            resData.message = "更改成功"
            res.json(resData)
        }
    })
})
module.exports = router;