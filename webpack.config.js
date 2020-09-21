const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, './dist'),
        filename: '[name].[contenthash:10].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json'),
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        }),
        new CleanWebpackPlugin()
    ],
    mode: 'development',
    devServer: {
        port: 8088,
        open: true,
        contentBase: resolve(__dirname, 'dist'),
        compress: true
    },
    devtool: 'eval-source-map'
}
