var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

//加载body-parser处理post提交的数据
const bodyParser = require('body-parser');
//bodyparser设置  unencoded格式
app.use(bodyParser.urlencoded({extended:true}));
//bodyparser设置   application/json格式
app.use(bodyParser.json());


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
app.use('/articles',articlesRouter)


module.exports = app;
