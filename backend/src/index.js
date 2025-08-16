import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Debug logging
console.log('Starting application...');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
import { 
  registerUser, 
  getUsers, 
  loginUser, 
  forgotPassword, 
  logoutUser, 
  getUserProfile,
  updateUserProfile 
} from './controllers/userController.js';
import { validateUserRegistration } from './middleware/validators/userValidator.js';
import { validateLogin } from './middleware/validators/authValidator.js';
import { authenticateToken } from './middleware/auth.js';
import userFavoriteRoutes from './routes/userFavoriteRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Get port from environment and store in Express.
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://localhost:5173',
  'http://localhost:8080',
  'https://arcane-forge-suite.vercel.app',
  'https://sistema-arcane-forge.vercel.app',
  'https://back-end-projetokirvano-b30617960bd0.herokuapp.com',
  process.env.FRONTEND_URL
].filter(Boolean);

// Handle preflight requests first
app.options('*', cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Then apply CORS for all other requests
const corsOptions = {
  origin: function (origin, callback) {
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    // In production, only allow whitelisted origins
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'x-access-token'],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(helmet());
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
router.post('/users/logout', authenticateToken, logoutUser);
router.post('/users/forgot-password', forgotPassword);
router.get('/users', getUsers);
router.get('/users/:userId', authenticateToken, getUserProfile);
// Update user profile without authentication
router.put('/users/:userId', updateUserProfile);

// Mount favorites routes directly on the app to bypass authentication middleware
app.use('/api/favorites', userFavoriteRoutes);

// Mount API routes
app.use('/api', router);

// Apply authentication middleware to all routes except favorites
app.use((req, res, next) => {
  // Skip authentication for favorites routes
  if (req.path.startsWith('/api/favorites')) {
    return next();
  }
  // Apply authentication to all other routes
  authenticateToken(req, res, next);
});

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Log detailed error information
  console.error('Error details:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers
  });

  // Send appropriate response
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    error: isProduction ? 'Internal Server Error' : err.message,
    message: isProduction ? 'An unexpected error occurred' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Available endpoints:');
  console.log(`- GET  http://localhost:${PORT}/api/health`);
  console.log(`- POST http://localhost:${PORT}/api/users/register`);
  console.log(`- GET  http://localhost:${PORT}/api/users`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
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
