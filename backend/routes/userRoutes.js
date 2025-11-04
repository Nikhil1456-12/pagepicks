const express = require('express');
const router = express.Router();
const {
     registerUser,
     loginUser,
     getProfile,
     verifyEmail,
     forgotPassword,
     resetPassword,
     updateProfile,
 } = require('../controllers/userController');
const auth = require('../middleware/auth'); // FIXED: Import correct middleware

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Private routes (requires authentication middleware)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;