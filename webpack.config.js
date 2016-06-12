const path = require('path');
const autoprefixer = require('autoprefixer');

const ROOT = path.resolve(__dirname, 'app');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,
    entry: {
        javascript: './app.js',
        html: './index.html'
    },

    resolve: {
        root: ROOT,
        alias: {
        },
        extensions: ['', '.js', '.jsx', '.scss']
    },

    devtool: 'source-map',

    output: {
        filename: 'app.js',
        path: DIST
    },

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
                excludes: /\.lib\.scss$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&sourceMap&localIdentName=[path][name]__[local]___[hash:base64:5]',
                    'postcss',
                    'resolve-url',
                    'sass?sourceMap'
                ]
            },

            // CSS Globals
            {
                test: /\.lib\.scss$/,
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
    },
    postcss: function () {
        return [autoprefixer];
    },
    imageWebpackLoader: {
        pngquant: {
            quality: '65-90',
            speed: 4
        },
        svgo: {
            plugins: [{
                removeViewBox: false
            }, {
                removeEmptyAttrs: false
            }]
        }
    }
};