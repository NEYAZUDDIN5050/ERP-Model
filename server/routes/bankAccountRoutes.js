// server/routes/bankAccountRoutes.js
import express from 'express';
import { addBankAccount, getBankAccounts } from '../controllers/bankAccountController.js';

const router = express.Router();

router.post('/', addBankAccount);
router.get('/', getBankAccounts);

export default router;