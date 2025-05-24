// server/routes/payrollRoutes.js
import express from 'express';
import { addPayroll, getPayrolls } from '../controllers/payrollController.js';

const router = express.Router();

router.post('/', addPayroll);
router.get('/', getPayrolls);

export default router;