const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');     // 清除旧的构建文件

module.exports = {
    // 入口
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    devtool: 'inline-source-map',                       // 追塑错误源代码
    devServer: {
        contentBase: './dist'                           // 服务器监听目录
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(['dist']),               // 清除旧的构建文件，和 服务器监听耦合了？
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    // 出口
    output:{
        filename: '[name].bundle.js',                   // 多对多输入输出，名字 + 后缀
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,                         // 样式通道
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,           // 图片资源通道
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,    // 字体加载通道
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

