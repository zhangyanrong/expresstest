const config = require('../config/config');
const mysql = require('mysql');
exports.getConnection = function() {
    var res = mysql.createConnection(config.mysqlConf);
    res.connect();
    return res;
};