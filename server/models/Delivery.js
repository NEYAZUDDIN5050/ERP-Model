import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
     status: {
        type: String,
        enum: ['Scheduled', 'In Transit', 'Delivered'],
        default: 'Scheduled',
     },
     createdAt: {
        type: Date,
        default: Date.now,
     },

});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;