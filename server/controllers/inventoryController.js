// server/controllers/inventoryController.js
import InventoryTransfer from '../models/InventoryTransfer.js';
import LowStockAlert from '../models/LowStockAlert.js';
import Stock from '../models/Stock.js';
import StockMovement from '../models/StockMovement.js';

// Inventory Transfers
export const addInventoryTransfer = async (req, res) => {
  try {
    const { productName, quantity, fromWarehouse, toWarehouse } = req.body;
    if (!productName || !quantity || !fromWarehouse || !toWarehouse) {
      return res.status(400).json({ message: 'Product Name, Quantity, From Warehouse, and To Warehouse are required.' });
    }
    const transfer = new InventoryTransfer({
      ...req.body,
      quantity: parseInt(quantity),
    });
    await transfer.save();
    res.status(201).json(transfer);
  } catch (error) {
    res.status(500).json({ message: `Error creating transfer: ${error.message}` });
  }
};

export const getInventoryTransfers = async (req, res) => {
  try {
    const transfers = await InventoryTransfer.find().sort({ createdAt: -1 });
    res.status(200).json(transfers);
  } catch (error) {
    res.status(500).json({ message: `Error fetching transfers: ${error.message}` });
  }
};

// Low Stock Alerts
export const addLowStockAlert = async (req, res) => {
  try {
    const { productName, currentStock, threshold } = req.body;
    if (!productName || currentStock == null || threshold == null) {
      return res.status(400).json({ message: 'Product Name, Current Stock, and Threshold are required.' });
    }
    const alert = new LowStockAlert({
      ...req.body,
      currentStock: parseInt(currentStock),
      threshold: parseInt(threshold),
    });
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: `Error creating alert: ${error.message}` });
  }
};

export const getLowStockAlerts = async (req, res) => {
  try {
    const alerts = await LowStockAlert.find().sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: `Error fetching alerts: ${error.message}` });
  }
};

// Stocks
export const addStock = async (req, res) => {
  try {
    const { productName, warehouse, quantity } = req.body;
    if (!productName || !warehouse || quantity == null) {
      return res.status(400).json({ message: 'Product Name, Warehouse, and Quantity are required.' });
    }
    const stock = new Stock({
      ...req.body,
      quantity: parseInt(quantity),
    });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: `Error creating stock: ${error.message}` });
  }
};

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ updatedAt: -1 });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: `Error fetching stocks: ${error.message}` });
  }
};

// Stock Movements
export const addStockMovement = async (req, res) => {
  try {
    const { productName, type, quantity, warehouse } = req.body;
    if (!productName || !type || !quantity || !warehouse) {
      return res.status(400).json({ message: 'Product Name, Type, Quantity, and Warehouse are required.' });
    }
    const movement = new StockMovement({
      ...req.body,
      quantity: parseInt(quantity),
    });
    await movement.save();
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ message: `Error creating movement: ${error.message}` });
  }
};

export const getStockMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find().sort({ createdAt: -1 });
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ message: `Error fetching movements: ${error.message}` });
  }
};