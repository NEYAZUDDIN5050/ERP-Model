// server/controllers/deliveryController.js
import Delivery from '../models/Delivery.js';

export const addDelivery = async (req, res) => {
  try {
    const { orderId, deliveryDate, status } = req.body;

    if (!orderId || !deliveryDate) {
      return res.status(400).json({ message: 'Order ID and Delivery Date are required.' });
    }

    const delivery = new Delivery({
      orderId,
      deliveryDate: new Date(deliveryDate),
      status: status || 'Scheduled',
    });

    await delivery.save();
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: `Error creating delivery: ${error.message}` });
  }
};

export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({ createdAt: -1 });
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: `Error fetching deliveries: ${error.message}` });
  }
};