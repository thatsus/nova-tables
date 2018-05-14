const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
        './src/NovaTable.vue'
    ],
    output: {
        filename: 'NovaTable.js',
        path: __dirname + '/dist',
    },
    mode: 'production',
    // ensure we are using the version of Vue that supports templates
    resolve: {
        extensions: ['.vue', '.js']
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: '../img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '../fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    }
};

