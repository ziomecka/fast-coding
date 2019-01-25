require('dotenv').config();
const generateCourses = require('./generate.courses');
const generateTranslations = require('./generate.translations');

function insertCourses() {
    let fun = require('./insert.courses').insertCourses;

    try {
        fun();
        console.log('DONE');
        return true;
    } catch (err) {
        throw err;
    }
}

function insertTranslations() {
    let fun = require('./insert.translations').insertTranslations;

    try {
        fun();
        console.log('DONE');
        return true;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertCourses,
    insertTranslations,
    generateCourses, // into the directory MongoDB/courses
    generateTranslations // into the directory MongoDB/translations
};

require('make-runnable');