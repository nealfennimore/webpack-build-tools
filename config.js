const path = require('path');

module.exports = {
    paths: {
        ROOT: path.resolve(__dirname, 'app'),
        PUBLIC: path.resolve(__dirname, 'public'),
        DEV: path.resolve(__dirname, 'dev'),
    },
    regex: {
        VENDOR_FILES: /vendor(Styles)?\.(scss|css|js)$/,
        VENDOR_SCSS: /vendorStyles\.scss$/
    }
};