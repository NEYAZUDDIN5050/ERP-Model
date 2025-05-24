// server/routes/leaveRoutes.js
import express from 'express';
import { applyLeave, getLeaves } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/', applyLeave);
router.get('/', getLeaves);

export default router;
