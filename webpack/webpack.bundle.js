const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

/** DIRECTORIES */
const DIR = path.resolve(__dirname, '..', 'bundle');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  output: {
    path: DIR,
    publicPath: '/',
    filename: '[name].[hash:8].js'
  },
  plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ]
});
