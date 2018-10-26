const pathlib = require('path');
module.exports = {
    getPath: (src = '') => {
        return pathlib.join(mass.appPath, src);
    }
}