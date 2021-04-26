const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './triton/src/main.js',
    output: {
        path: path.resolve(__dirname, './triton/js'),
        filename: 'main.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    { loader: 'vue-loader' },
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                use: [
                    { loader: 'url-loader?limit=100000' }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}