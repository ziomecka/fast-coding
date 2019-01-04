const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationSchema = require('./translation');

const translationsSchema = new Schema({
    "_id": {
        type: String,
        required: [ true, 'Id has to be a string'],
        unique: true
    },
    "en": translationSchema,
    "pl": translationSchema
}, {
    collection: "translations"
});

module.exports = translationsSchema;