var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var process=require('process')//自定义端口号时引入的模块

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goods=require('./routes/Goods')//引入goods路由

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){//路由拦截:在没有登陆的情况下拦截购物车
// console.log(req.cookies)
  if(req.cookies.userId){
    next()
  }else{
    console.log(req.originalUrl)
    if(req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.originalUrl.indexOf('/goods/list')>-1 || req.originalUrl.indexOf('/goods/addCart')>-1){//因为/goods/list后面有传的参数，所以是能用indexof方法，不能等于
      next()
    }
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// process.env.PORT = 3001;//自定义端口号

module.exports = app;
