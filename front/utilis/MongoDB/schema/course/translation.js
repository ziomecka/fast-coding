const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationSchema = new Schema({
    en: {
        type: String,
        minLength: [ 1, 'English translation has to have length of min 1']
    },
    pl: {
        type: String,
        minLength: [ 1, 'Polish translation has to have length of min 1']
    }
});

module.exports = translationSchema;