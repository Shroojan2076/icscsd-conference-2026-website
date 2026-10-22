import express from 'express';
import cors from 'cors';
import path from 'path';
import { env } from './config/env';
import { testDbConnection } from './config/db';
import apiRoutes from './routes/api.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all during dev/demo, can restrict to env.CORS_ORIGIN
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded PDFs statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    conference: 'ICSCSD 2026 - VIT Pune',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRoutes);
app.use('/api/v1', apiRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = parseInt(env.PORT, 10) || 5000;

app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(`🚀 ICSCSD 2026 PERN Backend running on port ${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
  console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
  console.log(`====================================================`);

  // Test DB connection in background
  await testDbConnection();
});

export default app;
