require('dotenv').config();
const generateCourses = require('./generate.courses');
const generateTranslations = require('./generate.translations');

async function createCoursesCollection() {
    let fun = require('./create.collection').createCollection;

    try {
        await fun();
        console.log('DONE');
        return true;
    } catch (err) {
        throw err;
    }
}

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
    createCoursesCollection,
    insertCourses,
    insertTranslations,
    generateCourses, // into the directory MongoDB/courses
    generateTranslations // into the directory MongoDB/translations
};

require('make-runnable');