const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

const DIR = path.resolve(__dirname, '..', '_deploy');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  output: {
    path: DIR
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js(\?.*)?$/i,
        exclude: /server.*/,
        deleteOriginalAssets: true
    }),
    // new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimize: true,
    // runtimeChunk: "single",
    splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
                // name(module) {
                //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                //     return `npm.${ packageName.replace('@', '') }`;
                // }
            }
        }
    }
  }
});
