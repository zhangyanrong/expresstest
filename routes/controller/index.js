var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('users/index', {name: '标题'});
});

router.get('/delcookie', function (req, res) {//删除cookie
    delete req.session['name'];//删除session
    res.clearCookie('name');
    res.clearCookie('name2');
    res.end();
});

router.get('/sessionCount', function (req, res) {//请求计数
    req.session['count'] = req.session['count']!=null ? req.session['count'] + 1 : 1;
    res.send(JSON.stringify(req.session['count']));
    res.end();
});

router.get('/usecookie', function () {
    res.cookie('name', 'zyr', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: false});//cookie使用 (path:存储地址,父级可获取子级的cookid。maxAge:有效时间,毫秒为单位。signed:是否需要签名)
    res.cookie('name2', 'zyr2', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: true});
    var name = req.cookies;//获取未签名的cookie
    var signname = req.signedCookies;//获取签名的cookie
    res.end(name.name + '-----' + signname.name2);
});

module.exports = router;