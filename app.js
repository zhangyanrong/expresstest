const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const cons = require('consolidate');
const mysql = require('mysql');
const redis = require('redis');

// view engine setup
app.engine('html', cons.ejs);//哪种模版引擎
app.set('view engine', 'ejs');//输出什么东西(默认的扩展名)
app.set('views', path.join(__dirname, 'views'));//视图文件位置

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser(config.cookieSign.sign));
app.use(cookieSession(config.sessionKeys));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: config.configPath.uploadPath}).any());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    req.users = config.users;
    //注册mysql------start
    var mysqlConn = mysql.createConnection(config.mysqlConf);
    mysqlConn.connect();
    req.clientMysql = mysqlConn;
    //注册mysql------end

    //注册redis------start
    req.clientRedis = redis.createClient();
    req.clientRedis.on("error", function (error) {
        res.status(500).send(error);
    });
    //注册redis------end
    next();
});

var indexRouter = require('./routes/controller/index');
var usersRouter = require('./routes/controller/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;