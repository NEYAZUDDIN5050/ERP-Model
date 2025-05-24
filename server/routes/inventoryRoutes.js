// server/routes/inventoryRoutes.js
import express from 'express';
import {
  addInventoryTransfer,
  getInventoryTransfers,
  addLowStockAlert,
  getLowStockAlerts,
  addStock,
  getStocks,
  addStockMovement,
  getStockMovements,
} from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/transfers', addInventoryTransfer);
router.get('/transfers', getInventoryTransfers);
router.post('/low-stock-alerts', addLowStockAlert);
router.get('/low-stock-alerts', getLowStockAlerts);
router.post('/stocks', addStock);
router.get('/stocks', getStocks);
router.post('/movements', addStockMovement);
router.get('/movements', getStockMovements);

export default router;