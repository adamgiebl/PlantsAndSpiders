const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = (env, argv) => ({
    entry: {
        main: './src/main.js'
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: argv.mode === 'production' ? 'chunks/[name].[chunkhash].js' : 'chunks/[name].js',
        filename: argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js'
    },
    resolve: {
        alias: {
            shared: path.resolve(__dirname, 'src/shared/'),
            assets: path.resolve(__dirname, 'assets/'),
            classes: path.resolve(__dirname, 'classes/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                sideEffects: true,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|mp3)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename: argv.mode === 'production' ? '[name].[contenthash].css' : '[name].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new CopyWebpackPlugin([{ from: 'assets' }]),
        new CompressionPlugin({
            algorithm: 'gzip'
        })
    ],
    devServer: {
        contentBase: 'dist',
        watchContentBase: true,
        port: 3000
    }
})
