const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');
const autoprefixer      = require('autoprefixer');
const merge             = require('lodash/merge');

const ROOT = path.resolve(__dirname, 'app');
const DIST = path.resolve(__dirname, 'dist');

const isDev = process.env.NODE_ENV === 'development';

const VENDOR_FILES = /vendor(Styles)?\.(scss|css|js)$/;
const VENDOR_SCSS  = /vendorStyles\.scss$/;

var config =  {
    context: ROOT,

    resolve: {
        root: ROOT,
        alias: {
            styles: 'scss',
            scss: 'scss',
            scripts: 'js'
        },
        extensions: ['', '.js', '.jsx', '.scss']
    },

    entry: {
        app: ['./app'],

        vendor: [
            'react',
            'react-dom'
        ],
        vendorStyles: ['./scss/vendor/vendor.scss'],

        html: ['./index.html']
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        path: DIST
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: [
                VENDOR_FILES,
                /html\.js$/,
                /styles\.js$/
            ]
        })
    ],

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

            // App styles with CSS locals
            {
                test: /\.scss$/,
                excludes: VENDOR_SCSS,
                loader: ExtractTextPlugin.extract('style', [
                    'css?modules&importLoaders=1&sourceMap&localIdentName=[path][name]-[local]_[hash:base64:5]',
                    'postcss',
                    'resolve-url',
                    'sass?sourceMap'
                ].join('!'))
            },

            // Vendor styles
            {
                test: VENDOR_SCSS,
                loader: ExtractTextPlugin.extract('style', [
                    'css',
                    'postcss',
                    'resolve-url',
                    'sass'
                ].join('!'))
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

if(isDev){
    // Merge in dev settings if exists
    try {
        var devConfig = require('./webpack.config.development.js');
        config = merge({}, config, {module: {loaders: null}},  devConfig);
    } catch(e){
        console.error('No webpack development config. Loading defaults.')
    }

} else {
    // Put in production to generate react production mode
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    );
}

module.exports = config;