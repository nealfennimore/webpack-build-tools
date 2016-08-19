const config = require('./config');

module.exports = {
    output: {
        path: config.paths.DEV,
        pathinfo: true
    },
    devtool: 'eval',
    plugins: null,
    module: {
        loaders: [

            // Javascript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },

            // HTML
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },

            // CSS Locals
            {
                test: /\.scss$/,
                excludes: config.regex.VENDOR_SCSS,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&sourceMap&localIdentName=[path][name]-[local]_[hash:base64:5]',
                    'postcss',
                    'resolve-url',
                    'sass?sourceMap'
                ]
            },

            // CSS Globals
            {
                test: config.regex.VENDOR_SCSS,
                loaders: [
                    'style',
                    'css',
                    'postcss',
                    'resolve-url',
                    'sass'
                ]
            },

            // Images
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack'
                ]
            },

            // Fonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)\?.*$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    }
};