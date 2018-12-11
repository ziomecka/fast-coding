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
  stats: {
    builtAt: true,
    cached: true,
    cachedAssets: true,
    chunks: true,
    chunkGroups: true,
    chunkModules: true,
    chunkOrigins: true,
    chunksSort: "field",
    colors: true,
    entrypoints: false,
    env: true,
    errors: true,
    errorDetails: true,
    hash: true,
    modules: true,
    modulesSort: "field",
    performance: true,
    publicPath: true,
    reasons: true,
    usedExports: true,
    warnings: true
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
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new CompressionPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],

  optimization: {
    minimize: true,
    namedModules: true,
    usedExports: true,
    runtimeChunk: "single",
    splitChunks: {
        cacheGroups: {
            commons: {
                chunks: "initial",
                name: "main",
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
