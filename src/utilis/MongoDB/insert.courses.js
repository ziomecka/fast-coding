const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const Course = require('./schema/index')('course');

const insertCourses = async () => {
    let files = fs.readdirSync(path.resolve(__dirname, './courses/'));

    mongoose.connect(process.env.MONGODB_URI);

    let data = [];

    for ( const file in files ) {
        data.push(JSON.parse(fs.readFileSync(path.resolve(__dirname, './courses/', files[file]))));
    }

    try {
        await Course.insertMany(data);
    } catch (err) {
        console.log(`Mongoose insert many error: ${ err }`);
    }

    data = null;
    mongoose.disconnect();
};

module.exports = { insertCourses };