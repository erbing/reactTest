const webpack =  require('webpack')
const path = require('path')


module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bunlde.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: {}
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'bunlde',
            fliename: 'build-[hash].min.js'
        })
    ],
    devServer: {
        contnteBase: './src/',
        compress: true,
        hot: true,
        host: '127.0.0.1',
        port: '9000'
    }
}