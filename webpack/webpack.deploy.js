const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

const DIR = path.resolve(__dirname, '..', 'deploy');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  output: {
    path: DIR,
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new CompressionPlugin(),
    // new webpack.HashedModuleIdsPlugin()
  ]
});
