// server/models/Pricing.js
import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pricing = mongoose.model('Pricing', pricingSchema);

export default Pricing;