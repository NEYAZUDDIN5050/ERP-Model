// routes/attendanceRoutes.js
import express from 'express';
import { createAttendance, getAllAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/', createAttendance);
router.get('/', getAllAttendance);

export default router;