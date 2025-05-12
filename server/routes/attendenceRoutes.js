// routes/attendanceRoutes.js

import express from 'express';
import { createAttendence, getAllAttendence } from '../controllers/attendenceController.js';

const router = express.Router();

router.post('/', createAttendence);
router.get('/', getAllAttendence);

export default router; // ✅ This is crucial for import to work in server.js
