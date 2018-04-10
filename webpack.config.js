
module.exports = {
    devtool: 'source-map',
    mode: 'production',
    // ensure we are using the version of Vue that supports templates
    resolve: {
        extensions: ['.vue', '.js']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    buble: {
                        loader: 'buble-loader',
                        query: {
                            objectAssign: 'Object.assign'
                        }
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'buble-loader',
                query: {
                    objectAssign: 'Object.assign',
                },
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

