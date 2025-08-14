import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Get MongoDB URI from environment variable or use the hardcoded one as fallback
    const connectionString = process.env.MONGODB_URI || "mongodb+srv://felipeholandafreitas:cWP78Nnt3b1tMb96@projeto-kirvano.qtilluf.mongodb.net/Projeto-Kirvano?retryWrites=true&w=majority";
    
    if (!connectionString) {
      throw new Error('MongoDB connection string is not defined');
    }
    
    // Log a masked version of the connection string for security
    const maskedConnectionString = connectionString.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, '$1***:***@');
    console.log('Connecting to MongoDB with URI:', maskedConnectionString);
    
    const connection = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('MongoDB connected successfully');
    console.log('MongoDB host:', connection.connection.host);
    console.log('MongoDB database:', connection.connection.name);
    
    // Handle connection events
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

export default connectDB;
