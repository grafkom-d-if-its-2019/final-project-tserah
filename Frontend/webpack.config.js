const path = require('path');

const WebpackBar = require('webpackbar');

module.exports = {
    mode: 'development',
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new WebpackBar()
    ]
};