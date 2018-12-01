const mongoose = require('mongoose');
const model = require('./schema/');

async function createCollection() {
    mongoose.connect(process.env.MONGODB_URI);

    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', () =>  model());
};

module.exports = { createCollection };