const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

const DEPLOY_DIR = path.resolve(__dirname, '..', 'deploy');

const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: DEPLOY_DIR,
  },
  externals: [
    // {
    //   react: {
    //     root: 'React',
    //     commonjs2: 'react',
    //     commonjs: ['react'],
    //     amd: 'react',
    //   },
    // },
    // /@material-ui\/core\/*./,
    // /@material-ui\/icons\/*./
  ],
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CompressionPlugin(),
    new BundleAnalyzerPlugin()
  ],

  optimization: {
    minimize: true,
    namedModules: true,
    usedExports: true
  },
});
