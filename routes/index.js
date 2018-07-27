var express = require('express');
var app = express();
var config  = require('../config/config');
app.use(function (req, res, next) {
    req.users = config.users;
    next();
});
module.exports = app;