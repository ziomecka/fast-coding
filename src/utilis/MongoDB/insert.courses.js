const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const Course = require('./schema/index')();

const insertCourses = () => {
    fs.readdir(path.resolve(__dirname, './courses/'), (err, files) => {
        if (err) throw err;

        mongoose.connect(process.env.MONGODB_URI);

        for ( file in files ) {
            fs.readFile(
                path.resolve(__dirname, './courses/', files[file]),
                (err, data) => {
                    if (err) throw err;

                    let course = new Course(JSON.parse(data));

                    try {
                        course.validateSync();
                    } catch (err) {
                        throw err;
                    }

                    course.save(err => {
                        if (err) throw err;
                        course = null; // GC?
                        return true;
                    });

                    return true;
                }
            );
        }
    });
};

module.exports = { insertCourses };