const express = require('express');
const router = express.Router();
const pathlib = require('path');
const fs = require('fs');
// const assert = require('assert');
// const co = require('co');
// const thunkify = require('thunkify');
const async = require('async');
// const promise = require('es6-promise').Promise;
const lodash = require('lodash');
var cheerio = require('cheerio');
var superagent = require('superagent');

const myPath = require('../../model/myPath');
const myCrypto = require('../../model/myCrypto');
const mysqlPool = require('../../model/mysqlPool');
const myFile = require('../../model/myFile');


function findAll(sql, callback) {
    // console.log(sql);
    mysqlPool.query(sql, (err, datas) => {
        if (err) {
            console.log(err.message);
            return;
        }
        callback(err, datas);
    });
}

async function writeToJsonAsync(fileName, content) {
    await myFile.writeFile(fileName, content)
}

async function readFileJson(fileName, callback) {
    let datas = await myFile.readFile(fileName);
    callback(null, datas);
}

// function writeToJson(fileName, content) {
//     fs.writeFile(fileName, content, function (err) {
//         if (err) throw err;
//     });
// }

router.get('/', (req, res) => {
    // console.log(myCrypto.signer('123', myPath.getPath())); //签名
    // let appPath = myPath.getPath();
    // console.log(myCrypto.verify('123',myCrypto.signer('123', appPath), appPath)); //验证签名
    // return;

    // var aaa = myCrypto.crypto('123','sha');
    // console.log(aaa);
    // var a = myCrypto.cipher('123','111');
    // console.log(a);
    // var b = myCrypto.decipher(a,'111')
    // console.log(b);

    // var a = lodash.chunk(['a', 'b', 'c', 'd'], 2);
    // console.log(a);
    // req.clientRedis.set('test', '123');
    // var a = JSON.stringify(lodash.orderBy([40, 30, 50]));
    // res.send(a);

    /**
     * async写法
     */
    async.auto({
        fileOne: (callback) => {
            let fileStaticPath = myPath.getPath('public/static/news/1.json');
            fs.access(fileStaticPath, fs.constants.F_OK, (err) => {
                let isExist = err ? '2' : '1';//文件是否存在
                callback(null, isExist);
            });
        },
        fileTwo: ['fileOne', (fileOneResult, callback) => {
            let fileStaticPath = myPath.getPath('public/static/news/1.json');
            if (fileOneResult.fileOne == '1') {
                readFileJson(fileStaticPath, callback)
            } else {
                callback(null, '');
            }
        }],
        three: ['fileTwo', (fileContent, callback) => {
            if (fileContent.fileTwo) {
                callback(null, fileContent.fileTwo);
            } else {
                let fileStaticPath = myPath.getPath('public/static/news/1.json');
                let sql = 'select * from channel_statistic_class';
                findAll(sql, (err, datas) => {
                    writeToJsonAsync(fileStaticPath, JSON.stringify(datas));
                    callback(err, datas);
                });
            }
        }],

        three: (callback) => {
            let sql = 'select * from channel_statistic_class';
            findAll(sql, callback);
        },
        four: (callback) => {
            let sql = 'select * from user_share';
            findAll(sql, callback);
        },
    }, (errs, results) => {
        if (errs) {
            res.status(500).send();
        }
        res.json({title: '标题'});
        // res.json({title: '标题', 'datas': results.three});
        // res.render('index/index', {title: '标题', datas: results.one, 'redis': results.two});
    });


    /**
     * 一般回调写法
     */
    // req.clientMysql.query('select * from teacher_label limit 5', (err, datas) => {
    //     if (err) {
    //         res.status(500).send();
    //     }
    //     // req.clientRedis.get('test',(err, reply)=> {
    //     // res.render('index/index', {title: '标题', datas: datas,'redis': reply});
    //     // });
    //     console.log('one');
    // });

    // req.clientMysql.query('select * from channel_statistic_class', (err, datas) => {
    //     if (err) {
    //         res.status(500).send();
    //     }
    //     console.log('two');
    // });
    // req.clientMysql.query('select * from channel_statistic_class', (err, datas) => {
    //     if (err) {
    //         res.status(500).send();
    //     }
    //     console.log('three');
    //     res.json({});
    // });
    return;
});

router.get('/cheerio', (req, res, next) => {
    superagent.get('http://news.baidu.com/').end((err, sres) => {//请求页面地址    页面获取到的数据
        if (err) return next(err);
        let $ = cheerio.load(sres.text);//用cheerio解析页面数据
        let arr = [];
        $(".ulist.focuslistnews").each((index, element) => {//下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
            let $eleItem = $(element).find('.bold-item a');
            if (!$eleItem.text()) {
                return;
            }
            // console.log($eleItem);
            let $eleItemSon = $(element).find('.bold-item ~ li a');
            // console.log($eleItemSon);
            let item = {};
            $eleItemSon.each((i, elem) => {
                item[i] = {title: $(elem).text(), href: $(elem).attr('href')};
            });
            arr.push({
                title: $eleItem.text(),
                href: $eleItem.attr('href'),
                item: item,
            });
        });
        res.send(arr);
    })
});

router.get('/delcookie', (req, res) => {//删除cookie
    delete req.session['name'];//删除session
    res.clearCookie('name');
    res.clearCookie('name2');
    res.end();
});

router.get('/sessionCount', (req, res) => {//请求计数
    req.session['count'] = req.session['count'] != null ? req.session['count'] + 1 : 1;
    res.send(JSON.stringify(req.session['count']));
    res.end();
});

router.get('/usecookie', (req, res) => {
    res.cookie('name', 'zyr', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: false});//cookie使用 (path:存储地址,父级可获取子级的cookid。maxAge:有效时间,毫秒为单位。signed:是否需要签名)
    res.cookie('name2', 'zyr2', {path: '/', maxAge: 30 * 24 * 3600 * 1000, signed: true});
    var name = req.cookies;//获取未签名的cookie
    var signname = req.signedCookies;//获取签名的cookie
    res.end(name.name + '-----' + signname.name2);
});

router.post('/uploadfile', (req, res) => {//上传文件
    var multerData = req.files[0];
    var newfilename = multerData.path + pathlib.parse(multerData.originalname).ext;

    fs.rename(multerData.path, newfilename, (err) => {
        if (err) {
            res.send('上传失败');
            res.end();
        } else {//上传成功
            return res.redirect('/');
        }
    });
});

module.exports = router;