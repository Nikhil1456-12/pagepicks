const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const Book = mongoose.models.Book || require('./models/Book');

    // Get all books with their story content
    const books = await Book.find({}, 'title story _id').sort({title: 1});

    console.log(`📚 Total books: ${books.length}`);
    console.log('\n=== BOOKS WITH AND WITHOUT CONTENT ===\n');

    let booksWithContent = 0;
    let booksWithoutContent = 0;
    const noContentBooks = [];

    books.forEach(book => {
      if (book.story && book.story.trim().length > 0) {
        booksWithContent++;
      } else {
        booksWithoutContent++;
        noContentBooks.push({
          id: book._id,
          title: book.title
        });
      }
    });

    console.log(`📖 Books with content: ${booksWithContent}`);
    console.log(`📭 Books without content: ${booksWithoutContent}`);

    if (noContentBooks.length > 0) {
      console.log('\n=== BOOKS WITHOUT CONTENT ===');
      noContentBooks.forEach((book, index) => {
        console.log(`${index + 1}. "${book.title}" (ID: ${book.id})`);
      });
    }

    // Test download endpoint for first book with content
    if (booksWithContent > 0) {
      const firstBookWithContent = books.find(book => book.story && book.story.trim().length > 0);
      if (firstBookWithContent) {
        console.log(`\n🔍 Testing download for: "${firstBookWithContent.title}"`);
        console.log(`📝 Content length: ${firstBookWithContent.story.length} characters`);
        console.log(`🔗 Download URL would be: /api/books/${firstBookWithContent._id}/download`);
      }
    }

    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

connectDB();