const fs = require('fs');
const MyFile = {
    writeFile: (src, content) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(src, content, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    readFile: (src) => {
        return new Promise((resolve, reject) => {
            fs.readFile(src, 'utf8', (err, datas) => {
                if (err) {
                    reject(err);
                }
                resolve(datas)
            })
        })
    }
};
module.exports = MyFile;