const fs = require('fs');

const writeFile = (src, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(src, content, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

const readFile = (src) => {
    return new Promise((resolve, reject) => {
        fs.readFile(src, 'utf8', (err, datas) => {
            if (err) {
                reject(err);
            }
            resolve(datas)
        })
    })
}

exports.writeFile = writeFile;
exports.readFile = readFile;