const mongoose = require('mongoose');
const courseSchema = require('./course/');

const map = new Map([
    [ 'course', courseSchema ]
]);

module.exports = ( key ) => mongoose.model(key, map.get( key ));