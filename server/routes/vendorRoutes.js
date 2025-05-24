// server/routes/vendorRoutes.js
import express from 'express';
import { addVendor, getVendors, deleteVendor } from '../controllers/vendorController.js';

const router = express.Router();

router.post('/', addVendor);
router.get('/', getVendors);
router.delete('/:id', deleteVendor);

export default router;