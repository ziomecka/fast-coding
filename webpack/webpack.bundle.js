const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

/** DIRECTORIES */
const DIR = path.resolve(__dirname, '..', '_bundleFront');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  output: {
    path: DIR,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ]
});
