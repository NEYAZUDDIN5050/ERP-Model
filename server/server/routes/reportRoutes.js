// server/routes/reportRoutes.js
import express from 'express';
import { addReport, getReports } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', addReport);
router.get('/', getReports);

export default router;