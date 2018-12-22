const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/dev-server'
  ],
  output: {
    publicPath: '/',
  },
  devServer: {
    hot: true,
    historyApiFallback: true // redirect 404s to index.html. For webpac-dev-server
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: {
    namedModules: true,
  },
});
