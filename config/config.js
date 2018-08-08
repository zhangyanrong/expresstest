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