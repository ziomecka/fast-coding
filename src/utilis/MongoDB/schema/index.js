const mongoose = require('mongoose');
const courseSchema = require('./course/');
const translationsSchema = require('./translations/');

const map = new Map([
    [ 'course', courseSchema ],
    [ 'translations', translationsSchema ]
]);

module.exports = ( key ) => mongoose.model(key, map.get( key ));