const mongoose = require('mongoose');

const userLibrarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate entries
userLibrarySchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('UserLibrary', userLibrarySchema);