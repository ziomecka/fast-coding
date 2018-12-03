const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

const DEPLOY_DIR = path.resolve(__dirname, '..', 'deploy');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: DEPLOY_DIR,
    chunkFilename: '[name].chunkhash.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ["babel-loader", 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': 'production' }),
    new CompressionPlugin(),
  ],

  optimization: {
    minimize: true,
    namedModules: true,
    usedExports: true,
    splitChunks: {
        cacheGroups: {
            commons: {
                chunks: "initial",
                minChunks: 2
            },
            vendor: {
                test: /node_modules/,
                chunks: "initial",
                name: "vendor",
                priority: 10,
                enforce: true
            }
        }
    }
  },
})
