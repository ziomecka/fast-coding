const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationSchema = new Schema({
    content: {
        type: String,
        required: [ true, "Content has to be provided" ]
    },
    type: {
        type: [ "h", "p" ],
        required: [ true, "Type has to be provided" ]
    }
});

module.exports = translationSchema;