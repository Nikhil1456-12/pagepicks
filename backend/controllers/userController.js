const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../config/email');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
     const { username, email, password, firstName, lastName, favoriteGenres } = req.body;

     // Validation
     if (!username || !email || !password) {
         res.status(400);
         throw new Error('Username, email, and password are required');
     }

     // Check if user exists
     const userExists = await User.findOne({
         $or: [{ email }, { username }]
     });

     if (userExists) {
         res.status(400);
         const field = userExists.email === email ? 'Email' : 'Username';
         throw new Error(`${field} already exists`);
     }

     // Create user (password will be hashed by pre-save hook)
     const user = await User.create({
         username,
         email,
         password,
         firstName,
         lastName,
         favoriteGenres: favoriteGenres || []
     });

     if (user) {
         // Email verification is now set to true by default, no token generation needed

         res.status(201).json({
             _id: user._id,
             username: user.username,
             email: user.email,
             firstName: user.firstName,
             lastName: user.lastName,
             favoriteGenres: user.favoriteGenres,
             isEmailVerified: user.isEmailVerified,
             token: generateToken(user._id),
             message: 'Registration successful!'
         });
     } else {
         res.status(400);
         throw new Error('Invalid user data');
     }
 });

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
     const { email, password } = req.body;

     // Check for user email
     const user = await User.findOne({ email });

     if (user && (await user.comparePassword(password))) {
         // Update last login time
         await user.updateLastLogin();

         // Check if account is active
         if (user.accountStatus !== 'active') {
             res.status(401);
             throw new Error('Account is not active. Please contact support.');
         }

         res.json({
             _id: user._id,
             username: user.username,
             email: user.email,
             firstName: user.firstName,
             lastName: user.lastName,
             avatar: user.avatar,
             favoriteGenres: user.favoriteGenres,
             isEmailVerified: user.isEmailVerified,
             role: user.role,
             booksInLibrary: user.booksInLibrary,
             booksRead: user.booksRead,
             token: generateToken(user._id),
         });
     } else {
         res.status(401);
         throw new Error('Invalid credentials');
     }
 });

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
     // req.user is set by the auth middleware
     // Update last active time
     await req.user.updateLastActive();

     res.status(200).json({
         _id: req.user._id,
         username: req.user.username,
         email: req.user.email,
         firstName: req.user.firstName,
         lastName: req.user.lastName,
         bio: req.user.bio,
         avatar: req.user.avatar,
         favoriteGenres: req.user.favoriteGenres,
         preferredLanguage: req.user.preferredLanguage,
         isEmailVerified: req.user.isEmailVerified,
         role: req.user.role,
         booksInLibrary: req.user.booksInLibrary,
         booksRead: req.user.booksRead,
         totalReadingTime: req.user.totalReadingTime,
         joinedDate: req.user.joinedDate,
         lastLogin: req.user.lastLogin,
         lastActive: req.user.lastActive,
         followersCount: req.user.followersCount,
         followingCount: req.user.followingCount,
     });
 });

// @desc    Verify email with token
// @route   GET /api/users/verify-email/:token
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
     // Hash the token from URL
     const hashedToken = crypto
         .createHash('sha256')
         .update(req.params.token)
         .digest('hex');

     // Find user with this token and token not expired
     const user = await User.findOne({
         emailVerificationToken: hashedToken,
         emailVerificationExpires: { $gt: Date.now() }
     });

     if (!user) {
         res.status(400);
         throw new Error('Invalid or expired verification token');
     }

     // Update user as verified
     user.isEmailVerified = true;
     user.emailVerificationToken = undefined;
     user.emailVerificationExpires = undefined;

     await user.save({ validateBeforeSave: false });

     res.status(200).json({
         message: 'Email verified successfully! You can now log in.',
         verified: true
     });
 });

// @desc    Request password reset
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
      const { email, phoneNumber } = req.body;

      if (!email && !phoneNumber) {
          res.status(400);
          throw new Error('Please provide an email address or phone number');
      }

      let user;
      if (email) {
          user = await User.findOne({ email });
      } else if (phoneNumber) {
          user = await User.findOne({ phoneNumber });
      }

      if (!user) {
          console.log('No user found with email:', email, 'or phone:', phoneNumber);
          res.status(200); // Return success to avoid revealing user existence
          return res.json({
              message: 'If an account with that email or phone number exists, password reset instructions have been sent'
          });
      }

      // Rate limiting: Check if user has made too many requests recently
      const now = new Date();
      const timeWindow = 15 * 60 * 1000; // 15 minutes
      const maxAttempts = 5;

      if (user.lastPasswordResetRequest &&
          (now - user.lastPasswordResetRequest) < timeWindow &&
          user.passwordResetAttempts >= maxAttempts) {
          res.status(429);
          throw new Error('Too many password reset requests. Please try again later.');
      }

      // Reset attempts if time window has passed
      if (!user.lastPasswordResetRequest ||
          (now - user.lastPasswordResetRequest) >= timeWindow) {
          user.passwordResetAttempts = 0;
      }

      // Increment attempts
      user.passwordResetAttempts += 1;
      user.lastPasswordResetRequest = now;

      // Generate reset token
      const resetToken = user.generatePasswordResetToken();
      await user.save({ validateBeforeSave: false });

      // Send password reset email
      const emailResult = await sendPasswordResetEmail(user.email, resetToken);

      if (emailResult.success) {
          console.log('Password reset email sent successfully to:', user.email, 'Message ID:', emailResult.messageId);
          res.status(200).json({
              message: 'If an account with that email exists, password reset instructions have been sent',
              // For development only - remove in production
              resetToken: resetToken,
              note: 'In production, this token would be sent via email'
          });
      } else {
          console.error('Failed to send password reset email:', emailResult.error);
          // Still return success to avoid revealing user existence
          res.status(200).json({
              message: 'If an account with that email exists, password reset instructions have been sent',
              // For development only - remove in production
              resetToken: resetToken,
              note: 'In production, this token would be sent via email'
          });
      }
  });

// @desc    Reset password with token
// @route   POST /api/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
     const { password } = req.body;

     if (!password) {
         res.status(400);
         throw new Error('Please provide a new password');
     }

     // Hash the token from URL
     const hashedToken = crypto
         .createHash('sha256')
         .update(req.params.token)
         .digest('hex');

     // Find user with this token and token not expired
     const user = await User.findOne({
         passwordResetToken: hashedToken,
         passwordResetExpires: { $gt: Date.now() }
     });

     if (!user) {
         res.status(400);
         throw new Error('Invalid or expired reset token');
     }

     // Check if token has expired
     if (user.passwordResetExpires < Date.now()) {
         res.status(400);
         throw new Error('Password reset token has expired. Please request a new one.');
     }

     // Update password (pre-save hook will hash it)
     user.password = password;
     user.passwordResetToken = undefined;
     user.passwordResetExpires = undefined;
     user.passwordResetAttempts = 0; // Reset attempts on successful password change
     user.lastPasswordResetRequest = undefined;

     await user.save();

     res.status(200).json({
         message: 'Password reset successfully! You can now log in with your new password.'
     });
 });

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
     const { firstName, lastName, bio, avatar, favoriteGenres, preferredLanguage } = req.body;

     // Find user and update profile fields
     const user = await User.findById(req.user._id);

     if (!user) {
         res.status(404);
         throw new Error('User not found');
     }

     user.firstName = firstName || user.firstName;
     user.lastName = lastName || user.lastName;
     user.bio = bio || user.bio;
     user.avatar = avatar || user.avatar;
     user.favoriteGenres = favoriteGenres || user.favoriteGenres;
     user.preferredLanguage = preferredLanguage || user.preferredLanguage;

     await user.save();

     res.status(200).json({
         message: 'Profile updated successfully',
         user: {
             _id: user._id,
             username: user.username,
             email: user.email,
             firstName: user.firstName,
             lastName: user.lastName,
             bio: user.bio,
             avatar: user.avatar,
             favoriteGenres: user.favoriteGenres,
             preferredLanguage: user.preferredLanguage,
         }
     });
 });

module.exports = {
     registerUser,
     loginUser,
     getProfile,
     verifyEmail,
     forgotPassword,
     resetPassword,
     updateProfile,
 };