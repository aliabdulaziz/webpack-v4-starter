const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { env } = require('process');

module.exports = env => {
    return {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devtool: '',
        devServer: {
            hot: true,
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                    ]
                },
                {
                    test: /\.(png|svg|jp(eg|g)|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.html$/i,
                    use: [
                        'html-loader'
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, 
                {
                    test: require.resolve('jquery'),
                    loader: 'expose-loader',
                    options: {
                        exposes: ['$', 'jQuery'],
                    },
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new webpack.SourceMapDevToolPlugin({
                "filename": "[file].map[query]"
            }),
            new MiniCssExtractPlugin({
                filename: !env.production ? '[name].css' : '[name].[hash].css',
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            })
        ]
    }
};