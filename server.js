 import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());  // For parsing application/json
app.use(cors());  // Enabling CORS

// Routes
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('🚀 ERP Backend is running');
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
