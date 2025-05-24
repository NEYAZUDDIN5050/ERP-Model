// server/routes/invoiceRoutes.js
import express from 'express';
import { addInvoice, getInvoices } from '../controllers/invoiceController.js';

const router = express.Router();

router.post('/', addInvoice);
router.get('/', getInvoices);

export default router;