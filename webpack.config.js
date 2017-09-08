const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: [
        './src/index.js'
    ],

    output: {
        publicPath: 'http://localhost:3000/',
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'source-map',

    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true,
            disable: NODE_ENV === 'development'
        }),
        new webpack.DefinePlugin({NODE_ENV: JSON.stringify(NODE_ENV)}),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        modules: ['node_modules', 'bower_components'],
        extensions: ['.js', '.less']
    },
    resolveLoader: {
        modules: ['node_modules', 'bower_components'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: __dirname + '/public',
    //
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: ['transform-runtime']
                    }
                }
            },  {
                test: /\.css$/,
                use: [ 'style', 'css', 'autoprefixer' ]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: "style"
                    }],
                    use: [{
                        loader: "css", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "autoprefixer"
                    }, {
                        loader: "less", options: {
                            sourceMap: true,
                        }
                    }]
                })
            }, {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'url',
                        options: {
                            limit: 8192,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }, {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: {
                    loader: 'url',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};

if(NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}