var express = require('express');
var router = express.Router();
// const fs = require("fs");
var db = require("../../model/db");
// var users = require('../../config/config');

router.get('/listUsers', function (req, res) {
    res.send(db.createdb());
    res.end();
});

router.get('/login', function (req, res) {
    var user_list = req.users;
    var user = req.query['user'];
    // user_list = {1: 1, 2: 2};
    var pass = req.query['pass'];
    // res.send(typeof(user_list[user]));
    if (user_list[user] == null) {
        res.send({res: 'error', msg: '用户不存'});
    } else if (user_list[user] === pass) {
        res.send({res: 'ok', msg: 'ok'});
    } else {
        res.send({res: 'error', msg: '密码错误'});
    }
});

module.exports = router;
