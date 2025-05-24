import mongoose from 'mongoose';

const inventoryMovementSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true,

    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    fromLocation: {
        type: String,
        required: true,
        trim: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const InventoryMovement = mongoose.model('InventoryMovement', inventoryMovementSchema);

export default InventoryMovement;