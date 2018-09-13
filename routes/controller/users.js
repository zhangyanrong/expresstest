const express = require('express');
const router = express.Router();
// const fs = require("fs");
// var users = require('../../config/config');

router.get('/listUsers', function (req, res) {
    // res.end();
});

router.get('/login', function (req, res) {
    var user_list = req.users;
    var user = req.query['user'];
    // user_list = {1: 1, 2: 2};
    var pass = req.query['pass'];
    // res.send(typeof(user_list[user]));
    if (user_list[user] == null) {
        res.send({res: 'error', msg: '用户不存在'});
    } else if (user_list[user] === pass) {
        res.send({res: 'ok', msg: 'ok'});
    } else {
        res.send({res: 'error', msg: '密码错误'});
    }
});

router.post('/reg', function (req, res) {
    var qq = req.body;
    console.log(qq);
    res.end();
});

module.exports = router;
