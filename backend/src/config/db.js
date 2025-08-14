import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connection retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000; // 2 seconds

const connectWithRetry = async (connectionString, retries = 0) => {
  try {
    console.log(`Attempting to connect to MongoDB (attempt ${retries + 1}/${MAX_RETRIES})...`);
    
    const connection = await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
      maxPoolSize: 50,
      minPoolSize: 5,
      maxIdleTimeMS: 60000,
      connectTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      retryReads: true,
      w: 'majority',
      appName: 'Projeto-Kirvano-API'
    });

    console.log('MongoDB connected successfully');
    console.log('MongoDB host:', connection.connection.host);
    console.log('MongoDB database:', connection.connection.name);
    
    return connection;
  } catch (error) {
    if (retries < MAX_RETRIES - 1) {
      console.error(`Connection attempt ${retries + 1} failed. Retrying in ${RETRY_DELAY_MS}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return connectWithRetry(connectionString, retries + 1);
    }
    throw error;
  }
};

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variable or use the hardcoded one as fallback
    const connectionString = process.env.MONGODB_URI || 
      "mongodb+srv://felipeholandafreitas:1wBez9L7Y13Udizw@projeto-kirvano.qtilluf.mongodb.net/Projeto-Kirvano?retryWrites=true&w=majority&appName=Projeto-Kirvano";
    
    if (!connectionString) {
      throw new Error('MongoDB connection string is not defined');
    }
    
    // Log a masked version of the connection string for security
    const maskedConnectionString = connectionString.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, '$1***:***@');
    console.log('Connecting to MongoDB with URI:', maskedConnectionString);
    
    // Connect with retry logic
    const connection = await connectWithRetry(connectionString);
    
    // Set up event listeners
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Will attempt to reconnect...');
      connectWithRetry(connectionString).catch(console.error);
    });
    
    // Enable query logging in development
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        console.log(`MongoDB Query: ${collectionName}.${method}`, JSON.stringify(query), doc || '');
      });
    }
    
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB after all retries:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

export default connectDB;
