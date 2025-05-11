import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import attendenceRoutes from './routes/attendenceRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// ✅ Proper CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,              // Allow cookies and headers
  })
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendence', attendenceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('🚀 ERP Backend is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
