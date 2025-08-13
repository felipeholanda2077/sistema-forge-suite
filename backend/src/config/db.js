import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // MongoDB Atlas connection string with provided credentials
    const connectionString = 'mongodb+srv://felipeholandafreitas:v6jaSWIzjjet7HHm@projeto-kirvano.qtilluf.mongodb.net/Projeto-Kirvano?retryWrites=true&w=majority&appName=Projeto-Kirvano';
    
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
