const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/dev-server'
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    // 'webpack-hot-middleware/client?/reload=true'
  ],
  output: {
    publicPath: '',
    // hmrPath: '__webpack_hmr/',
    // hotUpdateChunkFilename: '__webpack_hmr/[id].[hash].hot-update.js',
    // hotUpdateMainFilename: '__webpack_hmr/[hash].hot-update.js'
  },
  devServer: {
    hot: true,
    historyApiFallback: true // redirect 404s to index.html. For webpac-dev-server
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader?transpileOnly'],
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
