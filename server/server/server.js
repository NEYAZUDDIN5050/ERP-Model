// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

console.log('🚀 Starting server initialization...');

// Import routes
import authRoutes from './routes/authRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import reportRoutes from './routes/reportRoutes.js';         // ✅ FIX: was commented out → caused 404 on /api/reports
import invoiceRoutes from './routes/invoiceRoutes.js';
import bankAccountRoutes from './routes/bankAccountRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import inventoryMovementRoutes from './routes/inventoryMovementRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import crmRoutes from './routes/crmRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

console.log('✅ All route imports completed');

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5175'],
    credentials: true,
  })
);

console.log('✅ Middleware configured');

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📞 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Request body:', req.body);
  }
  next();
});

// Register routes
console.log('🔗 Registering routes...');

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);                       // ✅ FIX: re-enabled
app.use('/api/invoices', invoiceRoutes);
app.use('/api/bank-accounts', bankAccountRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/inventory-movements', inventoryMovementRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);

console.log('✅ All routes registered');

app.get('/', (req, res) => {
  res.send('🚀 ERP Backend is running');
});

// 404 handler (after all routes)
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Test these URLs:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api/auth/test`);
});