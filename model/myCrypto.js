/**
 * sha1加密
 * 使用方法:
 *      var myCrypto = require('myCrypto')
 *      myCrypto.crypto(str);
 */
const crypto = require('crypto');
const fs = require('fs');
// const mf = require('./myFile');
const pathlib = require('path');
const cryptoSign = '!1qaz*@wsx%3edc#4rfv!5tgb';//加密随机签名

async function getKey(src, callback){
    let privateKey = await mf.readFile(src);
    callback(privateKey);
}

module.exports = {
    'crypto': (str, cry = 'sha1') => {//对str进行sha1加密
        const salt = "!z9@x*#c&m$v^n%b";
        // return crypto.createHash(cry).update(str + salt).digest('hex');
        return crypto.createHmac(cry, cryptoSign).update(str + salt).digest('hex');
    },
    //AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等
    'cipher': (str, cry = 'aes-256-cbc') => {
        const aes = crypto.createCipher(cry, cryptoSign);
        let crypted = aes.update(str, 'utf8', 'hex');
        crypted += aes.final('hex');
        return crypted;
    },
    'decipher': (encrypted, cry = 'aes-256-cbc') => {
        const aes = crypto.createDecipher(cry, cryptoSign);
        let decrypted = aes.update(encrypted, 'hex', 'utf8');
        decrypted += aes.final('utf8');
        return decrypted;
    },
    'signer': (str, path, cry = 'sha256') => {
        let src = pathlib.join(path, 'config/server.pem');
        var privatePem = fs.readFileSync(src);
        var key = privatePem.toString();
        var sign = crypto.createSign(cry);
        sign.update(str);
        sig = sign.sign(key, 'hex');
        return sig;
    },
    'verify':(str, sig, path, cry = 'sha256')=>{
        let src = pathlib.join(path, 'config/cert.pem');
        var publicPem = fs.readFileSync(src);
        var pubkey = publicPem.toString();
        var verify = crypto.createVerify(cry);
        verify.update(str);
        return verify.verify(pubkey, sig, 'hex');
    }
    // 'signer': (str, path, callback, cry = 'sha256') => {
    //     let src = pathlib.join(path, 'config/server.pem');
    //     getKey(src, (privateKey)=>{
    //         let sign = crypto.createSign(cry);
    //         sign.update(str);
    //         let sig = sign.sign(privateKey, 'hex');
    //         callback(sig);
    //     });
    // }
}
