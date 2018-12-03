require('dotenv').config();

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

module.exports = {
    createCoursesCollection,
    insertCourses
};

require('make-runnable');