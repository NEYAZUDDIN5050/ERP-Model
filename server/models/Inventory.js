const mongoose = required('mongoose');

const InventorySchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    supplier: {type: String },
});

module.export = mongoose.model('Inventory' , InventorySchema);