// server/controllers/crmController.js
import Customer from '../models/Customer.js';
import Deal from '../models/Deal.js';
import Ticket from '../models/Ticket.js';
import Task from '../models/Task.js';

// Customers
export const addCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required.' });
    }
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: `Error creating customer: ${error.message}` });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: `Error fetching customers: ${error.message}` });
  }
};

// Deals
export const addDeal = async (req, res) => {
  try {
    const { title, customerName, amount } = req.body;
    if (!title || !customerName || amount == null) {
      return res.status(400).json({ message: 'Title, Customer Name, and Amount are required.' });
    }
    const deal = new Deal({
      ...req.body,
      amount: parseFloat(amount),
    });
    await deal.save();
    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({ message: `Error creating deal: ${error.message}` });
  }
};

export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find().sort({ createdAt: -1 });
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: `Error fetching deals: ${error.message}` });
  }
};

// Tickets
export const addTicket = async (req, res) => {
  try {
    const { customerName, issue } = req.body;
    if (!customerName || !issue) {
      return res.status(400).json({ message: 'Customer Name and Issue are required.' });
    }
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: `Error creating ticket: ${error.message}` });
  }
};

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: `Error fetching tickets: ${error.message}` });
  }
};

// Tasks
export const addTask = async (req, res) => {
  try {
    const { title, customerName } = req.body;
    if (!title || !customerName) {
      return res.status(400).json({ message: 'Title and Customer Name are required.' });
    }
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: `Error creating task: ${error.message}` });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error fetching tasks: ${error.message}` });
  }
};