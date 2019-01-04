const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationSchema = require('./translation');

const lessonSchema = new Schema({
    "title": translationSchema,
    "signs": {
        type: [ String | Number ],
        min: [ 1, 'At least one sign should be provided'],
    },
    "otherSigns": {
        type: [ String ]
    },
    "level": {
        type: Number,
        min: [ 0, 'Level has to be higher than 0']
    },
    "_id": {
        type: String,
        required: [ true, 'Id has to be a string'],
        unique: true
    },
    "category": {
        type: [ "standard" | String ],
        required: [ true, 'Category has to be correct']
    },
    "no": {
        type: Number,
        min: [ 0 , 'Number has to be higher than 0'],
        unique: true,
        required: [ true, 'No has to be correct']
    },
    "text": {
        type: String,
        minlength: [ 20, 'Text has to have length of at least 20 signs' ]
    },
    "translatedTexts": {
        type: translationSchema
    },
    "type": {
        type: [ "review" ],
    },
    "length": {
        type: Number,
    },
});

function lessonsValidator (lessons) {
    return lessons.every(lesson => lesson.text || lesson.translatedTexts);
}

module.exports = { lessonSchema, lessonsValidator };