const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationsSchema = new Schema({
    "id": {
        type: String,
        required: [ true, 'Id has to be a string'],
        unique: true
    },
    "en": { any: Object },
    "pl": { any: Object }
}, {
    collection: "translations",
    strict: false
});

module.exports = translationsSchema;