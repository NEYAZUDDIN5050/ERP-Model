const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    saleId: { type: String, required: true, unique: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now },


});

module.exports = mongoose.model('sales', SalesSchema);