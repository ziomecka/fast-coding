const insert = require('./insert');

const insertCourses = async () => {
    return await insert('./courses/', 'course');
};

module.exports = { insertCourses };