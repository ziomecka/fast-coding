const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationSchema = require('./translation');
const { lessonSchema, lessonsValidator } = require('./lesson');

const courseSchema = new Schema({
    "_id": {
        type: String,
        required: [ true, 'Id has to be a string'],
        unique: true
    },
    "title": {
        type: translationSchema,
        required: [ true, 'Course title is required']
    },
    "tag": {
        type: translationSchema,
        required: [ true, 'Course tag is required' ]
    },
    "description": {
        type: translationSchema,
        required: [ true, 'Course description is required']
    },
    "type": {
        type: [ "free" ],
        required: [ true, 'Course type is required']
    },
    "lessons": {
        type: [ lessonSchema ],
        validate: {
            validator: lessonsValidator,
            message: props => (
                `Validation of course: ${props.path}
                Some lesson has neither text nor translatedTexts.`
            )
        },
        required: [ true, 'Lessons are required']
    }
}, {
    collection: 'courses'
});

module.exports = courseSchema;