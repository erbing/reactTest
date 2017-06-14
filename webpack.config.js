const webpack =  require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');           // 创建一个 html 文件，并将你需要引入的近台资源进行引入
const OpenBrowserPlugin = require('open-browser-webpack-plugin');   // 打开浏览器

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bunlde.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: []
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),   // 加入热插拔
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'bunlde', 
            filename:'bunlde.min.js'
        }),  // 打包公依赖的资源
        /*压缩优化代码开始  可以关掉*/
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        /*压缩优化代码结束*/
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
        }),
        new OpenBrowserPlugin({
            url: 'http://127.0.0.1:9000'
        }),
    ],
    devServer: {
        contentBase: './src/',
        compress: true,
        hot: true,
        host: '127.0.0.1',
        port: '9000'
    }
}