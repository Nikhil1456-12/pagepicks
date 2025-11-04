const mongoose = require('mongoose');
const Book = require('./models/Book');
const connectDB = require('./config/database');
require('dotenv').config();

const checkBooks = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('🔍 Connected to database');

    // Find all books
    const allBooks = await Book.find({});
    console.log(`📚 Total books in database: ${allBooks.length}`);

    // Check for books with empty or missing coverImage
    const booksWithoutImages = allBooks.filter(book =>
      !book.coverImage ||
      book.coverImage.trim() === '' ||
      book.coverImage === null ||
      book.coverImage === undefined
    );

    const booksWithImages = allBooks.filter(book =>
      book.coverImage &&
      book.coverImage.trim() !== '' &&
      book.coverImage !== null &&
      book.coverImage !== undefined
    );

    console.log(`\n✅ Books with coverImage: ${booksWithImages.length}`);
    console.log(`❌ Books without coverImage: ${booksWithoutImages.length}`);

    if (booksWithoutImages.length > 0) {
      console.log('\n📋 Books without coverImage:');
      booksWithoutImages.forEach((book, index) => {
        console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.genre})`);
      });

      // Update books without coverImage
      console.log('\n🔄 Updating books without coverImage...');
      const defaultImage = 'https://via.placeholder.com/300x400?text=No+Cover+Image';

      for (const book of booksWithoutImages) {
        try {
          await Book.findByIdAndUpdate(book._id, { coverImage: defaultImage });
          console.log(`✅ Updated: "${book.title}"`);
        } catch (error) {
          console.log(`❌ Failed to update: "${book.title}" - ${error.message}`);
        }
      }

      console.log(`\n🎉 Successfully updated ${booksWithoutImages.length} books with default coverImage`);
    } else {
      console.log('\n✨ All books already have coverImage values!');
    }

    // Verify the updates
    const updatedBooksWithoutImages = await Book.find({
      $or: [
        { coverImage: { $exists: false } },
        { coverImage: '' },
        { coverImage: null },
        { coverImage: undefined }
      ]
    });

    console.log(`\n🔍 Verification - Books still without coverImage: ${updatedBooksWithoutImages.length}`);

    if (updatedBooksWithoutImages.length === 0) {
      console.log('🎯 All books now have coverImage values!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking/updating books:', error);
    process.exit(1);
  }
};

// Run the check function
if (require.main === module) {
  checkBooks();
}

module.exports = checkBooks;