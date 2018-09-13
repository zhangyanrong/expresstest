const express = require('express');
const router = express.Router();
const pathlib = require('path');
const fs = require('fs');
// const co = require('co');
// const thunkify = require('thunkify');
const async = require('async');
// const promise = require('es6-promise').Promise;
const lodash = require('lodash');

function findAll(request, sql, callback) {
    request.query(sql, function (err, datas) {
        callback(err, datas);
    });
}

router.get('/', function (req, res) {
    // var a = lodash.chunk(['a', 'b', 'c', 'd'], 2);
    // console.log(a);
    req.clientRedis.set('test', '123');
    //async写法
    async.auto({
        one: function (callback) {
            var sql = 'select * from teacher_label limit 5';
            findAll(req.clientMysql, sql, callback);
        },
        two: function (callback) {
            req.clientRedis.get('test', function (err, reply) {
                callback(err, reply);
            });
        },
        // two: ['one', function (datas, callback) {
        //     // console.log(datas);
        //     req.clientRedis.get('test', function (err, reply) {
        //         callback(err, reply);
        //     });
        // }]
    }, function (errs, results) {
        if (errs) {
            res.status(500).send();
        }
        res.json({title: '标题', datas: results.one, 'redis': results.two});
        // res.render('index/index', {title: '标题', datas: results.one, 'redis': results.two});
    });
    //一般回调写法
    // req.clientMysql.query('select * from teacher_label limit 5', (err, datas)=> {
    //     if(err){
    //         res.status(500).send();
    //     }
    //     req.clientRedis.get('test',(err, reply)=> {
    //         res.render('index/index', {title: '标题', datas: datas,'redis': reply});
    //     });
    // });

    return;
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

router.post('/uploadfile', function (req, res) {//上传文件
    var multerData = req.files[0];
    var newfilename = multerData.path + pathlib.parse(multerData.originalname).ext;

    fs.rename(multerData.path, newfilename, function (err) {
        if (err) {
            res.send('上传失败');
            res.end();
        } else {//上传成功
            return res.redirect('/');
        }
    });
});

module.exports = router;