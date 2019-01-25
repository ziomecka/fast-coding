const webpack = require('webpack');
const path = require('path');

/** DIRECTORIES */
const APP_DIR = path.resolve(__dirname, '..', 'front');

/** ENV */
const PROD_ENV = process && process.env.NODE_ENV
  ? process.env.NODE_ENV.trim() === 'production'
  : false;

const envFilePath = '../.env';

const MODE = PROD_ENV
  ? 'production'
  : 'development';

/** PLUGINS */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');

require('dotenv').config({ path: path.resolve( __dirname, envFilePath) });

// CLEAN
let pathToClean = process.argv
    .filter(item => RegExp(/.*PATH_TO_CLEAN.*/).test(item))[0] || '';
pathToClean = pathToClean.substr(pathToClean.search('=') + 1) || '';

const CLEAN_WEBPACK_PLUGIN = require('clean-webpack-plugin');
const pathsToClean = [ pathToClean ];
const cleanOptions = {
    root: '/home/kasia/Dokumenty/fast-coding/',
    verbose: true
};

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
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: `${ APP_DIR }/index.hbs`,
      chunksSortMode: "dependency"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CLEAN_WEBPACK_PLUGIN( pathsToClean , cleanOptions),
  ]
};
