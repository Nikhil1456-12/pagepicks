const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  author: { type: String, required: true, trim: true, index: true },
  genre: { type: String, trim: true, index: true },
  description: { type: String, trim: true },
  coverImage: { type: String, trim: true },
  story: { type: String, trim: true },
  lessons: [{
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now, index: true }
});

// Compound index for text search
bookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', bookSchema);
