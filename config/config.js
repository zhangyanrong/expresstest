exports.users = {
    "zhangsan": "password1",
    "lisi": "password2",
    "wangwu": "password3",
};

exports.cookieSign = {
    'sign': '123456'
};

exports.sessionKeys = {
    name: 'expresstest',//sessionid以及session签名的cookie名字
    keys: ['aaa', 'bbb', 'ccc'],
    maxAge: 24 * 3600 * 1000//session过期时间(一天)
};

exports.configPath = {
    uploadPath: './public/upload/'
};

exports.mysqlConf = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'music',
    port:3306,
    // charset:'utf8', //应该设置编码（省略在某些情况下会有错误）

    //以下选项均为默认值（如果不需要变动可省略）
    // acquireTimeout:10000, //获取连接的毫秒
    waitForConnections: true, //为true时，连接排队等待可用连接。为false将立即抛出错误
    connectionLimit: 10, //单次可创建最大连接数
    queueLimit: 0, //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
};