const path = require('path');

const WebpackBar = require('webpackbar');

module.exports = {
    mode: 'development',
    entry: {
        main: './index.js',
        client: './client.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: '$'
                },
                {
                    loader: 'expose-loader',
                    options: 'jQuery'
                },]
            }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new WebpackBar(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    externals: {
        jquery: 'jQuery'
    }
};