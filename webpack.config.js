/**
 * Created by liaoyf on 2016/10/25 0025.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var minimize = process.argv.indexOf('--minimize') !== -1;

module.exports = {
    entry: {
        polyfill: [
            'es5-shim',
            'es5-shim/es5-sham'
        ],
        app: [
            './example/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ["es2015", "react"]
                },
                plugins: [
                    "transform-es3-property-literals",
                    "transform-es3-member-expression-literals",
                    "transform-es2015-modules-simple-commonjs"
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?name=img/[hash:8].[ext]&limit=1024' //hash:8
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=font/[name].[ext]&limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=font/[name].[ext]&limit=10&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=font/[name].[ext]&limit=10&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=font/[name].[eot]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=font/[name].[svg]&limit=10&minetype=image/svg+xml'
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        contentBase: '/dist/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};