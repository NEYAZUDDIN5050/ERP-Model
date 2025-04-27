import express from 'express';
import config from './config/config.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
const app = express();
// Connect to MongoDB
connectDB();

app.use(express.json());

app.use(cors())
// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('🚀 ERP Backend is running');
});

app.listen(config.port, () =>
    console.log(`🚀 Server running on port ${config.port}`)
);
