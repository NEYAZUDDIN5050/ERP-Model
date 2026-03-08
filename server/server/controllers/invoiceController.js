// server/controllers/invoiceController.js
import Invoice from '../models/Invoice.js';

export const addInvoice = async (req, res) => {
  try {
    const { invoiceNumber, clientName, amount, dueDate, status } = req.body;

    if (!invoiceNumber || !clientName || amount == null || !dueDate) {
      return res.status(400).json({ message: 'Invoice Number, Client Name, Amount, and Due Date are required.' });
    }

    const invoice = new Invoice({
      invoiceNumber,
      clientName,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      status: status || 'Pending',
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: `Error creating invoice: ${error.message}` });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: `Error fetching invoices: ${error.message}` });
  }
};