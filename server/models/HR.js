const mongoose = require('mongoose');

const HRSchema = new mongoose.Schema({
    emplyeeId: { type: String, required: true, unique: true},
    name: {type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, requird: true },
    dateOfJoining: { type: Date, default: Date.now },

});
module.export = mongoose.model('HR' , HRSchema);