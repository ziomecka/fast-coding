const webpack = require('webpack');
const path = require('path');

/** ENV */
const PROD_ENV = process && process.env.NODE_ENV
  ? process.env.NODE_ENV.trim() === 'production'
  : false;

const envFilePath = '../.env';

const MODE = PROD_ENV
  ? 'production'
  : 'development';

/** PLUGINS */
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config({ path: path.resolve( __dirname, envFilePath) });

const entry = require('./entry');
const stats = require('./stats');
const rules = require('./rules');
const alias = require('./alias');

module.exports = {
  mode: MODE,
  entry,
  stats,
  module: { rules },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.sass'],
    alias
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new Dotenv({
      systemvars: true,
      path: path.resolve( __dirname, envFilePath )
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
            }
        }
    }
  }
};
