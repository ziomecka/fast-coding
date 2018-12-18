const webpack = require('webpack');
const path = require('path');

/** DIRECTORIES */
const APP_DIR = path.resolve(__dirname, '..', 'src');
const BUILD_DIR = path.resolve(__dirname, '..', 'bundle');
const DEPLOY_DIR = path.resolve(__dirname, '..', 'deploy');

/** ENV */
const PROD_ENV = process && process.env.NODE_ENV
  ? process.env.NODE_ENV.trim() === 'production'
  : false;

const ENV_FILE = process && process.env
  ? process.env.ENV_FILE
  : undefined;

const envFilePath = ENV_FILE
  ? `./.env.${ENV_FILE}`
  : './.env';

const DIR = PROD_ENV
  ? DEPLOY_DIR
  : BUILD_DIR;

const MODE = PROD_ENV
  ? 'production'
  : 'development';

/** PLUGINS */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');

require('dotenv').config({
  path: envFilePath,
});

/** CSS */
const postcssFlexbugs = require('postcss-flexbugs-fixes');
const postcssLost = require('lost');
const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const cssDeclarationSorter = require('css-declaration-sorter');
const cssMqpacker = require('css-mqpacker');

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

module.exports = {
  mode: MODE,
  entry: [`${APP_DIR}/index.tsx`],
  output: {
    path: DIR,
    publicPath: '/',
    filename: 'index.js',
  },
  module: {
    rules: [
        {
            test: /\.svg$/,
            use: [
                "babel-loader",
                {
                    loader: "react-svg-loader",
                    options: {
                        jsx: true,
                        svgo: {
                            plugins: [{ removeTitle: false }],
                            floatPrecision: 2
                        }
                    }
                }
            ]
        },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                postcssFlexbugs(),
                postcssLost(),
                postcssImport(),
                postcssNext({
                  browsers: ['last 2 version', 'Safari 7', 'ie 10'],
                }),
                cssDeclarationSorter({
                  order: 'concentric-css',
                }),
                cssMqpacker(),
              ],
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.sass'],
    alias: {
      images: path.resolve('./src/images'),
      styles: path.resolve('./src/styles'),
      fonts: path.resolve('./src/fonts'),
      components: path.resolve('./src/components'),
      views: path.resolve('./src/views'),
      utils: path.resolve('./src/utils'),
      root: path.resolve('./src'),
    },
  },
  plugins: [
    new WebpackCopyPlugin([
        {
          from: 'src/server',
          to: './'
        }
    ]),
    new Dotenv({
      systemvars: true,
      path: envFilePath,
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: `${APP_DIR}/index.hbs`,
      chunksSortMode: "dependency"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CLEAN_WEBPACK_PLUGIN( pathsToClean , cleanOptions),
  ],
  optimization: {},
};
