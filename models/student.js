const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    Physics: Number,
    Maths: Number,
    Chemistry: Number,
    PT: Number,
    Computer: Number,
    English: Number
});

const Keeper = new mongoose.model("Subject", subjectSchema);

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    sub: [subjectSchema]
});

module.exports = mongoose.model('Student', studentSchema)