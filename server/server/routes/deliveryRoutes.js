import express from 'express';
import { addDelivery, getDeliveries } from '../controllers/deliveryController.js';

const router = express.Router();

router.post('/', addDelivery);
router.get('/', getDeliveries);

export default router;
