const express = require('express');
const router = express.Router();
const { createAttendence, getAllAttendence }= require('../controllers/attendanceController');


router.post('/',createAttendance);
router.get('/', getAllAttendance);

module.exports = router;