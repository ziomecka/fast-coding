const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const Course = require('./schema/index')('course');
const Translations = require('./schema/index')('translations');

const map = new Map([
    [ 'course', Course ],
    [ 'translations', Translations ]
]);

const insert = async (targetPath, key) => {
    if (!targetPath || !key || typeof targetPath !== 'string' || typeof key !== 'string') {
        console.log('Insert: incorrect arguments');
    }

    let files;

    try {
        files = fs.readdirSync(path.resolve(__dirname, targetPath));
    } catch (err) {
        console.log(`Readdir error: ${ err }`);
    }

    mongoose.connect(process.env.MONGODB_URI);

    let data = [];

    for ( const file in files ) {
        data.push(JSON.parse(fs.readFileSync(path.resolve(__dirname, targetPath, files[file]))));
    }

    try {
        await map.get(key).insertMany(data);
    } catch (err) {
        console.log(`Mongoose insert many error: ${ err }`);
    }

    data = null;
    mongoose.disconnect();
};

module.exports = ( targetPath, key ) => insert( targetPath, key );