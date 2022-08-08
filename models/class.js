const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    classNames: {
        type: String,
        required: true
    },
    name: [{
        year: Number, //chnage it to date later
        class_teacher: String,
        subject_list: Array,
        students:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            }]
    }]

})

module.exports = mongoose.model('Classes', classSchema)