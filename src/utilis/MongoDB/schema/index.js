const mongoose = require('mongoose');
const courseSchema = require('./course');

module.exports = () => mongoose.model('course', courseSchema);