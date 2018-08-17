const config = require('../config/config');
const mysql = require('mysql');
function connectionName () {
    return mysql.createConnection(config.mysqlConf);
};
exports.getConnection = connectionName;