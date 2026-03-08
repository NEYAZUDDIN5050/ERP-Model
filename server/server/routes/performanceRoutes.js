// server/routes/performanceRoutes.js
import express from 'express';
import { addPerformanceGoal, getPerformanceGoals } from '../controllers/performanceController.js';

const router = express.Router();

router.post('/', addPerformanceGoal);
router.get('/', getPerformanceGoals);

export default router;