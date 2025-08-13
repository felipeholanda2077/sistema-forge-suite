import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { registerUser, getUsers, loginUser, forgotPassword } from './controllers/userController.js';
import { validateUserRegistration } from './middleware/validators/userValidator.js';
import { validateLogin } from './middleware/validators/authValidator.js';
import userFavoriteRoutes from './routes/userFavoriteRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const PORT = process.env.PORT || 3002;

// api/index.js
const app = require('../backend/src/index');
module.exports = app;

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://localhost:5173',
  'http://localhost:8080',
  'https://arcane-forge-suite.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Em produção, permita todas as origens
    if (process.env.NODE_ENV === 'production') {
      return callback(null, true);
    }
    
    // Em desenvolvimento, verifique a lista de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// User routes
router.post('/users/register', validateUserRegistration, registerUser);
router.post('/users/login', validateLogin, loginUser);
router.post('/users/forgot-password', forgotPassword);
router.get('/users', getUsers);

// User favorites routes
router.use('/favorites', userFavoriteRoutes);

// Mount API routes
app.use('/api', router);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found',
      path: req.originalUrl
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);

  // Handle different types of errors
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };

  res.status(statusCode).json(errorResponse);
});

// Start server with error handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`- GET  http://localhost:${PORT}/api/health`);
  console.log(`- POST http://localhost:${PORT}/api/users/register`);
  console.log(`- GET  http://localhost:${PORT}/api/users`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Consider restarting the server or doing cleanup here
});

export default app;
