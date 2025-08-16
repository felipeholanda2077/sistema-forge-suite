import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
    index: true // Add index for name field for faster lookups
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    index: true // Add index for email field for faster lookups
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't return password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  invalidTokens: [{
    type: String,
    select: false
  }],
  lastLogin: Date
}, {
  timestamps: true,
  versionKey: false
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hashing');
    return next();
  }
  
  try {
    console.log('Hashing new password...');
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt:', salt);
    
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing passwords...');
    console.log('Candidate password length:', candidatePassword ? candidatePassword.length : 'undefined');
    console.log('Stored password hash exists:', !!this.password);
    
    if (!candidatePassword || !this.password) {
      console.log('Missing password for comparison');
      return false;
    }
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error in comparePassword:', {
      message: error.message,
      stack: error.stack,
      candidatePasswordLength: candidatePassword ? candidatePassword.length : 'undefined',
      storedPasswordExists: !!this.password
    });
    throw error;
  }
};

// Method to invalidate a token
userSchema.methods.invalidateToken = async function(token) {
  if (!this.invalidTokens) {
    this.invalidTokens = [];
  }
  
  if (!this.invalidTokens.includes(token)) {
    this.invalidTokens.push(token);
    await this.save();
  }
  
  return this;
};

// Method to check if a token is invalid
userSchema.methods.isTokenInvalid = function(token) {
  if (!this.invalidTokens) return false;
  return this.invalidTokens.includes(token);
};

// Method to update last login time
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  await this.save();
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
