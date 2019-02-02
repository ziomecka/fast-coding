const optimization = require('./optimization');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

const DIR = path.resolve(__dirname, '..', '_deploy');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  output: {
    path: DIR
  },
  devtool: false,
  optimization,
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js(\?.*)?$/i,
        exclude: /server.*/,
        deleteOriginalAssets: true
    }),
  ]
});
