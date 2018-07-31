var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.cookie('name', 'zyr', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: false});//cookie使用 (path:存储地址,父级可获取子级的cookid。maxAge:有效时间,毫秒为单位。signed:是否需要签名)
    res.cookie('name2', 'zyr2', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: true});
    var name = req.cookies;//获取未签名的cookie
    var signname = req.signedCookies;//获取签名的cookie
    res.end(name.name+'-----'+signname.name2);
});

module.exports = router;