/**
 * sha1加密
 * 使用方法:
 *      var myCrypto = require('myCrypto')
 *      myCrypto.crypto(str);
 */
const crypto = require('crypto');
module.exports = {
    'crypto': function (str, cry='md5') {//对str进行sha1加密
        const cryptoSign = '!1qaz*2wsx%3edc#4rfv!5tgb';//加密随机签名
        var sha = crypto.createHash(cry);
        sha.update(str + cryptoSign);
        return sha.digest('hex');
    },
}
