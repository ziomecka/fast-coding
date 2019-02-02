const path = require('path');

/** ENV */
const PROD_ENV = process && process.env.NODE_ENV
  ? process.env.NODE_ENV.trim() === 'production'
  : false;

const MODE = PROD_ENV
  ? 'production'
  : 'development';

const alias = require('./alias');
const entry = require('./entry');
const plugins = require('./plugins');
const rules = require('./rules');
const stats = require('./stats');

module.exports = {
  mode: MODE,
  entry,
  stats,
  module: { rules },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.sass'],
    alias
  },
  plugins
};
