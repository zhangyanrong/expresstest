var mysql = require("mysql2");
var conf = require('../config/config');


var pool = mysql.createPool(conf.mysqlConf);
module.exports = pool;


// var query = (sql, callback) => {
//     pool.query(sql, (err, results, fields)=>{
//         callback(err, results, fields);
//     })
//
//     pool.getConnection((err, conn) => {
//         if (err) {
//             callback(err, null, null);
//         } else {
//             conn.query(sql, (err, results, fields) => {
//                 //释放连接
//                 conn.release();
//                 //事件驱动回调
//                 // console.log(sql);
//                 callback(err, results, fields);
//             });
//         }
//     });
// };
// module.exports = pool;



// async function main(sql, callback) {
//     const pool = mysql.createPool(conf.mysqlConf);
//     const promisePool = pool.promise();
//     const [rows, fields] = await promisePool.query(sql);
//     callback(rows);
// }
// module.exports = main;


