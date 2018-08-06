const express = require('express');
const router = express.Router();
const pathlib = require('path');
const fs = require('fs');

router.get('/', function (req, res) {
    res.render('index/index', {title: '标题'});
});

router.get('/delcookie', function (req, res) {//删除cookie
    delete req.session['name'];//删除session
    res.clearCookie('name');
    res.clearCookie('name2');
    res.end();
});

router.get('/sessionCount', function (req, res) {//请求计数
    req.session['count'] = req.session['count'] != null ? req.session['count'] + 1 : 1;
    res.send(JSON.stringify(req.session['count']));
    res.end();
});

router.get('/usecookie', function (req, res) {
    res.cookie('name', 'zyr', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: false});//cookie使用 (path:存储地址,父级可获取子级的cookid。maxAge:有效时间,毫秒为单位。signed:是否需要签名)
    res.cookie('name2', 'zyr2', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: true});
    var name = req.cookies;//获取未签名的cookie
    var signname = req.signedCookies;//获取签名的cookie
    res.end(name.name + '-----' + signname.name2);
});

router.post('/uploadfile', function (req, res) {
    var multerData = req.files[0];
    var newfilename = multerData.path + pathlib.parse(multerData.originalname).ext;

    fs.rename(multerData.path, newfilename, function (err) {
        if (err) {
            res.send('error');
        } else {
            res.send('上传成功');
        }
    });
    res.end();
});

module.exports = router;