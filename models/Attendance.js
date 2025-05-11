const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    employeeName: String,
    date: String,
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'present',
    }

});

module.exports = mongoose.model('Attendance', attendenceSchema);