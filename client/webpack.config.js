"use strict";

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');     // 清除旧的构建文件

const ROOT_PATH = path.resolve(__dirname);

module.exports = {

    entry: [ path.resolve(ROOT_PATH, './index.js') ],

    output:{
        path: path.resolve(ROOT_PATH, 'public'),                 // 都放到公共文件夹
        publicPath: '/',                                         // 这里比较困惑 —— ./则对应生产模式， / 对应开发模式。真奇怪！！！
        filename: 'bundle.js'
    },

    resolve: { extensions: ['.js', '.jsx'] },                    // 定义能够被打包的文件，文件后缀名

    devtool: 'inline-source-map',                               // 追塑错误源代码

    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'public'),
        // proxy: {                                             // 在服务器端设定了允许跨域
            // '/api/*': {
                // target: 'http://127.0.0.1:5000/'
            // }
        // },
        inline: true,
        port: 9000,
    },

    plugins: [
        new CleanWebpackPlugin(['public']),                     // 清除旧的构建文件，和 服务器监听耦合了？
        new HtmlWebpackPlugin({
            title: 'Design Today',
            favicon: './src/favicon-96x96.png',
            template: './index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,                                 // js 和 jsx 通道
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react']              // 注意加载预设是 react。state-0 支持 ES7
                    }
                }
            },
            {
                test: /\.css$/,                                  // 样式通道
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,                                  // scss
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,                    // 图片资源通道
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,             // 字体加载通道
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    }
};

