var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
//加载body-parser处理post提交的数据
const bodyParser = require('body-parser');

const fs = require("fs");             //文件模块，用于改文件名字
const pathLib = require("path");      //对路径进行解析

//bodyparser设置  unencoded格式
app.use(bodyParser.urlencoded({
    extended: true
}));
//bodyparser设置   application/json格式
app.use(bodyParser.json());

//multer中间件引用
const multer = require('multer')
//新浪sdk引用
const sinaCloud = require('scs-sdk')

//解决跨域请求
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles')
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/articles', articlesRouter)

//新浪云储存使用
sinaCloud.config.loadFromPath('./config/scs.json')
const uploads = multer({
    dest: './uploads'
}); //定义图片上传的临时目录
var s3 = new sinaCloud.S3();


let resData;
app.use((req, res, next) => {
    resData = {
        code: 'ok',
        message: ''
    }
    next()
})

app.post('/upload/imgs', uploads.single('file'), (req, res) => {

	var pathNew = req.file.path + pathLib.parse(req.file.originalname).ext;
    console.log(pathNew);
    fs.rename(req.file.path, pathNew, function (err) {
        if (err) {
            res.send("上传失败");
        } else {
            let fileName = pathNew;
            let remoteFilename = req.file.originalname;
            var fileBuffer = require('fs').readFileSync(fileName);
	        s3.putObject({
	            ACL: 'public-read',
	            Bucket: 'yang47/imgs',
	            Key: remoteFilename,
	            Body: fileBuffer
	        }, function(error, response) {
	            if (error) {
	                console.log(error);
	            } else {
	            	//上传图片成功，将图片地址返回给前端
	            	let path = "http://sinacloud.net/yang47/imgs/"+remoteFilename;
	            	resData.data = path
 					res.json(resData)
	                console.log('uploaded file[' + fileName + '] to [' + remoteFilename + ']');
	            }
	        });

        }
    });

       
   
})
module.exports = app;