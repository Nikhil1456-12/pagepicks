const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const Book = mongoose.models.Book || require('./models/Book');
    const books = await Book.find({}, 'title coverImage').sort({title: 1});

    console.log(`📚 Total books found: ${books.length}`);
    console.log('\n=== COVER IMAGE ANALYSIS ===\n');

    const imageMap = new Map();
    const duplicates = [];

    books.forEach(book => {
      const image = book.coverImage || '';
      if (imageMap.has(image)) {
        imageMap.get(image).push(book.title);
        duplicates.push({
          image: image,
          books: imageMap.get(image)
        });
      } else {
        imageMap.set(image, [book.title]);
      }
    });

    console.log(`🖼️  Unique cover images: ${imageMap.size}`);
    console.log('\n=== DUPLICATE COVER IMAGES ===');

    if (duplicates.length > 0) {
      duplicates.forEach((dup, index) => {
        console.log(`\n${index + 1}. Image: ${dup.image || 'NO_IMAGE'}`);
        console.log(`   Books: ${dup.books.join(', ')}`);
      });
    } else {
      console.log('\n✅ No duplicate cover images found!');
    }

    // Show all unique images for reference
    console.log('\n=== ALL UNIQUE COVER IMAGES ===');
    Array.from(imageMap.entries()).forEach(([image, books]) => {
      console.log(`\nImage: ${image || 'NO_IMAGE'}`);
      console.log(`Used by: ${books.length} book(s)`);
    });

    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

connectDB();