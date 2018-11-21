const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

const DEPLOY_DIR = path.resolve(__dirname, '..', 'deploy');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    path: DEPLOY_DIR,
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: ['ts-loader?transpileOnly'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // remove
    // new WebpackBundleAnalyzer(), // remove
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  optimization: {
    minimize: true,
    namedModules: true,
  },
});
