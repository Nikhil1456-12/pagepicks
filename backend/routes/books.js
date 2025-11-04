const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const { limit, genre, search } = req.query;

    let query = {};

    // Filter by genre if provided
    if (genre) {
      query.genre = genre;
    }

    // Search by title or author if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    let booksQuery = Book.find(query).sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit) {
      booksQuery = booksQuery.limit(parseInt(limit));
    }

    const books = await booksQuery;
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, description, coverImage, story } = req.body;
    if (!title || !author) return res.status(400).json({ message: 'Title and author required' });
    const book = new Book({ title, author, genre, description, coverImage, story });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!book) return res.status(404).json({ message: 'Not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Download book
router.get('/:id/download', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (!book.story) {
      return res.status(404).json({ message: 'Book content not available for download' });
    }

    // Create filename from book title
    const fileName = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;

    // Set headers for file download
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Send the book content
    res.send(book.story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
