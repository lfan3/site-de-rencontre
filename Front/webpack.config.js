const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['@babel/polyfill', './app/index.js'],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test:/\.(js)$/, use:'babel-loader'},
            {test:/\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins : [
        new HtmlWebpackPlugin({template:'./app/index.html'})
    ],
   // devServer:{
   //     proxy: {
   //         "/test": {
   //           target: "http://localhost:5000"
   //         }
   //     }
   //     //proxy: [{
   //     //    context: ['/express_backend', '/api'],
   //     //    target: 'http://localhost:5000',
   //     //  }]
   // //    historyApiFallback: true
   // }
    devServer: {
        historyApiFallback: true,
        port: 8085
    },
}