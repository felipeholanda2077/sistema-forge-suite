import mongoose from 'mongoose';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const registerUser = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'User with this email already exists',
          code: 'EMAIL_EXISTS'
        },
        message: 'Email already in use',
        statusCode: 400
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token: token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'E-mail ou senha inválidos'
        }
      });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'E-mail ou senha inválidos'
        }
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
    );

    // Update last login time
    await user.updateLastLogin();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token: token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    }

    // Get user from request (added by authenticateToken middleware)
    if (req.user && req.user.id !== 'anonymous') {
      const user = await User.findById(req.user.id);
      if (user) {
        await user.invalidateToken(token);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  console.log('\n=== GET USER PROFILE REQUEST ===');
  console.log('Endpoint:', req.originalUrl);
  console.log('Method:', req.method);
  console.log('Params:', req.params);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  try {
    // Verify MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected. Connection state:', mongoose.connection.readyState);
      throw new Error('Database connection not established');
    }

    const userId = req.params.userId;
    console.log('Processing request for userId:', userId);
    
    if (!userId) {
      console.error('No userId provided in request');
      return res.status(400).json({
        success: false,
        error: {
          message: 'User ID is required',
          code: 'MISSING_USER_ID'
        }
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid user ID format:', userId);
      return res.status(400).json({
        success: false,
        error: {
          message: 'ID de usuário inválido',
          code: 'INVALID_USER_ID',
          receivedId: userId
        }
      });
    }

    console.log('Searching for user with ID:', userId);
    
    // Add a timeout to the database query
    const user = await Promise.race([
      User.findById(userId).select('-password -__v -resetPasswordToken -resetPasswordExpire -invalidatedTokens').lean(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      )
    ]);
    
    if (!user) {
      console.error('User not found with ID:', userId);
      return res.status(404).json({
        success: false,
        error: {
          message: 'Usuário não encontrado',
          code: 'USER_NOT_FOUND',
          requestedId: userId
        }
      });
    }

    console.log('User found:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    // Ensure we're sending a clean response
    const userResponse = {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    console.log('Sending response for user:', userResponse.email);
    
    return res.status(200).json({
      success: true,
      data: userResponse
    });
    
  } catch (error) {
    console.error('\n=== ERROR IN GET USER PROFILE ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Formato de ID inválido',
          code: 'INVALID_ID_FORMAT',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
      });
    }
    
    if (error.message === 'Database query timeout') {
      return res.status(504).json({
        success: false,
        error: {
          message: 'Tempo limite de conexão com o banco de dados',
          code: 'DATABASE_TIMEOUT'
        }
      });
    }
    
    // Handle MongoDB connection errors
    if (error.name === 'MongoServerError' || error.name === 'MongoError') {
      console.error('MongoDB Error:', {
        code: error.code,
        codeName: error.codeName,
        errorLabels: error.errorLabels
      });
      
      return res.status(503).json({
        success: false,
        error: {
          message: 'Erro de conexão com o banco de dados',
          code: 'DATABASE_ERROR',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
      });
    }
    
    // Default error response
    res.status(500).json({
      success: false,
      error: {
        message: 'Erro ao processar a requisição',
        code: 'INTERNAL_SERVER_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }
    });
  } finally {
    console.log('\n=== REQUEST COMPLETED ===\n');
  }
};

/**
 * Update user profile
 * @route PUT /api/users/:userId
 */
export const updateUserProfile = async (req, res, next) => {
  console.log('\n=== UPDATE USER PROFILE REQUEST ===');
  console.log('Endpoint:', req.originalUrl);
  console.log('Method:', req.method);
  console.log('Params:', req.params);
  console.log('Body:', { ...req.body, password: req.body.password ? '[REDACTED]' : undefined });
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  try {
    const { userId } = req.params;
    const { name, email, password, currentPassword } = req.body;
    const requestingUserId = req.user?.id; // From auth middleware

    // Validate user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid user ID format:', userId);
      return res.status(400).json({
        success: false,
        error: {
          message: 'ID de usuário inválido',
          code: 'INVALID_USER_ID'
        }
      });
    }

    // Skip authentication check for now
    // This allows updates without requiring authentication
    // In a production environment, you should implement proper authentication
    console.log('Skipping authentication check for user update');

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found with ID:', userId);
      return res.status(404).json({
        success: false,
        error: {
          message: 'Usuário não encontrado',
          code: 'USER_NOT_FOUND'
        }
      });
    }

    // Handle password change if requested
    if (password) {
      console.log('Password change requested');
      
      if (!currentPassword) {
        console.log('Current password is required');
        return res.status(400).json({
          success: false,
          error: {
            message: 'A senha atual é obrigatória para alterar a senha',
            code: 'CURRENT_PASSWORD_REQUIRED'
          }
        });
      }

      try {
        console.log('Verifying current password...');
        
        // First, get the user with the password field
        const userWithPassword = await User.findById(user._id).select('+password');
        
        if (!userWithPassword) {
          console.log('User not found with password');
          return res.status(404).json({
            success: false,
            error: {
              message: 'Usuário não encontrado',
              code: 'USER_NOT_FOUND'
            }
          });
        }
        
        // Verify current password
        console.log('Comparing provided password with stored hash...');
        const isMatch = await userWithPassword.comparePassword(currentPassword);
        
        if (!isMatch) {
          console.log('Current password does not match');
          return res.status(400).json({
            success: false,
            error: {
              message: 'A senha atual está incorreta',
              code: 'INVALID_CURRENT_PASSWORD'
            }
          });
        }

        console.log('Current password verified, updating to new password');
        // Update password - the pre-save hook will handle hashing
        user.password = password;
        
      } catch (error) {
        console.error('Error verifying password:', error);
        return res.status(500).json({
          success: false,
          error: {
            message: 'Erro ao verificar a senha atual',
            code: 'PASSWORD_VERIFICATION_ERROR',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          }
        });
      }
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (email && email !== user.email) {
      // Check if new email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Este e-mail já está em uso',
            code: 'EMAIL_ALREADY_EXISTS'
          }
        });
      }
      user.email = email;
    }

    // Save updated user
    const updatedUser = await user.save();
    
    // Generate new token if password was changed
    let newToken;
    if (password) {
      newToken = jwt.sign(
        { userId: updatedUser._id, email: updatedUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
      );
    }

    // Prepare response
    const userResponse = {
      id: updatedUser._id,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    console.log('Profile updated successfully:', userResponse.email);
    
    const response = {
      success: true,
      message: password ? 'Senha alterada com sucesso' : 'Perfil atualizado com sucesso',
      data: userResponse
    };

    // Include new token in response if password was changed
    if (newToken) {
      response.token = newToken;
    }
    
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('\n=== ERROR UPDATING USER PROFILE ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      console.error('Validation error details:', error.errors);
      return res.status(400).json({
        success: false,
        error: {
          message: 'Dados de entrada inválidos',
          code: 'VALIDATION_ERROR',
          details: error.message,
          fields: error.errors ? Object.keys(error.errors) : undefined
        }
      });
    }
    
    // Handle duplicate key errors (e.g., duplicate email)
    if (error.code === 11000) {
      console.error('Duplicate key error:', error.keyValue);
      return res.status(400).json({
        success: false,
        error: {
          message: 'Este e-mail já está em uso',
          code: 'DUPLICATE_EMAIL',
          field: error.keyValue ? Object.keys(error.keyValue)[0] : undefined
        }
      });
    }
    
    // Handle JWT errors
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      console.error('JWT error:', error.message);
      return res.status(401).json({
        success: false,
        error: {
          message: 'Sessão expirada. Por favor, faça login novamente.',
          code: 'INVALID_TOKEN',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
      });
    }
    
    // Default error response with more details
    console.error('Unexpected error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      request: {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        body: { ...req.body, password: req.body.password ? '[REDACTED]' : undefined },
        query: req.query
      }
    });
    
    return res.status(500).json({
      success: false,
      error: {
        message: 'Erro ao atualizar o perfil',
        code: 'UPDATE_PROFILE_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        error: process.env.NODE_ENV === 'development' ? error.name : undefined
      }
    });
  } finally {
    console.log('\n=== UPDATE REQUEST COMPLETED ===\n');
  }
};

/**
 * Forgot password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }

    // Generate and save reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // In a real application, you would send an email here
    console.log('Password reset URL:', resetUrl);

    // In development, return the reset token for testing
    if (process.env.NODE_ENV === 'development') {
      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent',
        resetToken: resetToken,
        resetUrl: resetUrl
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);

    // Reset token and expiry in case of error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    next(error);
  }
};
