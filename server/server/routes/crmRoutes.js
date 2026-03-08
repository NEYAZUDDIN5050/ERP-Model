// server/routes/crmRoutes.js
import express from 'express';
import {
  addCustomer,
  getCustomers,
  addDeal,
  getDeals,
  addTicket,
  getTickets,
  addTask,
  getTasks,
} from '../controllers/crmController.js';

const router = express.Router();

router.post('/customers', addCustomer);
router.get('/customers', getCustomers);
router.post('/deals', addDeal);
router.get('/deals', getDeals);
router.post('/tickets', addTicket);
router.get('/tickets', getTickets);
router.post('/tasks', addTask);
router.get('/tasks', getTasks);

export default router;