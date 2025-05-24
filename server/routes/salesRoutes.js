// server/routes/salesRoutes.js
import express from 'express';
import {
  addInvoiceSales,
  getInvoices,
  addSalesOrder,
  getSalesOrders,
  addPricing,
  getPricings,
  addSalesReport,
  getSalesReports,
} from '../controllers/salesController.js';

const router = express.Router();

// Invoice Sales Routes
router.post('/invoices', addInvoiceSales);
router.get('/invoices', getInvoices);

// Sales Orders Routes
router.post('/orders', addSalesOrder);
router.get('/orders', getSalesOrders);

// Pricing Routes
router.post('/pricings', addPricing);
router.get('/pricings', getPricings);

// Sales Reports Routes
router.post('/reports', addSalesReport);
router.get('/reports', getSalesReports);

export default router;
