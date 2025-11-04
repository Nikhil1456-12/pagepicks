const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserLibrary = require('../models/UserLibrary'); // You need to create this model

// Add book to user's library
router.post('/add', auth, async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: 'bookId required' });
    
    // FIXED: Use req.user._id instead of req.userId
    const entry = new UserLibrary({ user: req.user._id, book: bookId });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's library
router.get('/', auth, async (req, res) => {
  try {
    // FIXED: Use req.user._id instead of req.userId
    const list = await UserLibrary.find({ user: req.user._id }).populate('book');
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove book from user's library
router.delete('/remove/:bookId', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!bookId) return res.status(400).json({ message: 'bookId required' });

    // FIXED: Use req.user._id instead of req.userId
    const deletedEntry = await UserLibrary.findOneAndDelete({
      user: req.user._id,
      book: bookId
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Book not found in library' });
    }

    res.json({ message: 'Book removed from library' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;