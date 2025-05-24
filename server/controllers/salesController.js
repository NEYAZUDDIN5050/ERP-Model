// server/controllers/salesController.js
import InvoiceSales from '../models/InvoiceSales.js';
import SalesOrder from '../models/SalesOrder.js';
import Pricing from '../models/Pricing.js';
import SalesReport from '../models/SalesReport.js';

// Add Invoice Sales
export const addInvoiceSales = async (req, res) => {
  try {
    const { invoiceNumber, customerName, totalAmount } = req.body;
    if (!invoiceNumber || !customerName || totalAmount == null) {
      return res.status(400).json({ message: 'Invoice Number, Customer Name, and Total Amount are required.' });
    }
    const invoice = new InvoiceSales({
      ...req.body,
      totalAmount: parseFloat(totalAmount),
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: `Error creating invoice: ${error.message}` });
  }
};

// Get All Invoice Sales
export const getInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceSales.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: `Error fetching invoices: ${error.message}` });
  }
};

// Add Sales Order
export const addSalesOrder = async (req, res) => {
  try {
    const { orderNumber, customerName } = req.body;
    if (!orderNumber || !customerName) {
      return res.status(400).json({ message: 'Order Number and Customer Name are required.' });
    }
    const order = new SalesOrder(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: `Error creating order: ${error.message}` });
  }
};

// Get Sales Orders
export const getSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: `Error fetching orders: ${error.message}` });
  }
};

// Add Pricing
export const addPricing = async (req, res) => {
  try {
    const { productName, price } = req.body;
    if (!productName || price == null) {
      return res.status(400).json({ message: 'Product Name and Price are required.' });
    }
    const pricing = new Pricing({
      ...req.body,
      price: parseFloat(price),
      discountPercentage: parseFloat(req.body.discountPercentage) || 0,
    });
    await pricing.save();
    res.status(201).json(pricing);
  } catch (error) {
    res.status(500).json({ message: `Error creating pricing: ${error.message}` });
  }
};

// Get Pricings
export const getPricings = async (req, res) => {
  try {
    const pricings = await Pricing.find().sort({ createdAt: -1 });
    res.status(200).json(pricings);
  } catch (error) {
    res.status(500).json({ message: `Error fetching pricings: ${error.message}` });
  }
};

// Add Sales Report
export const addSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, customerName, status } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start Date and End Date are required.' });
    }

    const query = {
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
    if (customerName) query.customerName = customerName;
    if (status && status !== 'All') query.status = status;

    const invoices = await InvoiceSales.find(query);
    const totalSales = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    const report = new SalesReport({
      ...req.body,
      totalSales,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: `Error generating report: ${error.message}` });
  }
};

// Get Sales Reports
export const getSalesReports = async (req, res) => {
  try {
    const reports = await SalesReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: `Error fetching reports: ${error.message}` });
  }
};
