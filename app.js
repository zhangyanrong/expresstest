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
const objMulter = multer({dest:'./public/upload/'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser(config.cookieSign.sign));
app.use(cookieSession(config.sessionKeys));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(objMulter.any());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    req.users = config.users;
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