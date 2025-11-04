const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  // Basic Information
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },

  // Enhanced Profile
  firstName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  phoneNumber: {
    type: String,
    trim: true,
    maxlength: 15
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  avatar: {
    type: String,
    default: ''
  },

  // User Preferences
  favoriteGenres: [{
    type: String,
    trim: true
  }],
  preferredLanguage: {
    type: String,
    default: 'en',
    trim: true
  },

  // Account Management
  isEmailVerified: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  accountStatus: {
    type: String,
    enum: ['active', 'suspended', 'deactivated'],
    default: 'active'
  },
  lastLogin: {
    type: Date
  },
  lastActive: {
    type: Date,
    default: Date.now
  },

  // Security Features
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  passwordResetAttempts: {
    type: Number,
    default: 0
  },
  lastPasswordResetRequest: {
    type: Date
  },
  emailVerificationToken: {
    type: String
  },
  emailVerificationExpires: {
    type: Date
  },

  // User Statistics
  booksInLibrary: {
    type: Number,
    default: 0
  },
  booksRead: {
    type: Number,
    default: 0
  },
  totalReadingTime: {
    type: Number,
    default: 0 // in minutes
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },

  // Social Features (for future use)
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followersCount: {
    type: Number,
    default: 0
  },
  followingCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time (10 minutes from now)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // Hash token and set to emailVerificationToken field
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  // Set expire time (24 hours from now)
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

  return verificationToken;
};

// Update last login time
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

// Update last active time
userSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save({ validateBeforeSave: false });
};

// Increment books read count
userSchema.methods.incrementBooksRead = function() {
  this.booksRead += 1;
  return this.save({ validateBeforeSave: false });
};

// Add book to library count
userSchema.methods.incrementLibraryCount = function() {
  this.booksInLibrary += 1;
  return this.save({ validateBeforeSave: false });
};

// Remove book from library count
userSchema.methods.decrementLibraryCount = function() {
  if (this.booksInLibrary > 0) {
    this.booksInLibrary -= 1;
  }
  return this.save({ validateBeforeSave: false });
};

// Add reading time
userSchema.methods.addReadingTime = function(minutes) {
  this.totalReadingTime += minutes;
  return this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model('User', userSchema);