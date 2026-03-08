// server/models/InventoryTransfer.js
import mongoose from 'mongoose';

const inventoryTransferSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  fromWarehouse: {
    type: String,
    required: true,
    trim: true,
  },
  toWarehouse: {
    type: String,
    required: true,
    trim: true,
  },
  transferDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InventoryTransfer = mongoose.model('InventoryTransfer', inventoryTransferSchema);

export default InventoryTransfer;