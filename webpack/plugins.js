const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const envFilePath = '../.env';

const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config({ path: path.resolve( __dirname, envFilePath) });

module.exports = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve( __dirname, '../front/index.html'),
        chunkSortMode: 'dependency'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      systemvars: true,
      path: path.resolve( __dirname, envFilePath )
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
];