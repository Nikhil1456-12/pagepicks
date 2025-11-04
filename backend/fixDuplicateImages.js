const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const Book = mongoose.models.Book || require('./models/Book');

    // Get all books with their current cover images
    const books = await Book.find({}, 'title coverImage _id').sort({title: 1});
    console.log(`📚 Found ${books.length} books`);

    // Create a map of current images and their usage
    const imageUsage = new Map();
    const booksToUpdate = [];

    books.forEach(book => {
      const image = book.coverImage || 'NO_IMAGE';
      if (!imageUsage.has(image)) {
        imageUsage.set(image, []);
      }
      imageUsage.get(image).push(book._id);
    });

    // Find images that are used by multiple books (duplicates)
    const duplicateImages = Array.from(imageUsage.entries())
      .filter(([image, bookIds]) => bookIds.length > 1)
      .map(([image, bookIds]) => ({ image, bookIds }));

    console.log(`\n🔍 Found ${duplicateImages.length} duplicate image groups`);

    // Generate unique cover images for books with duplicates
    const usedImages = new Set();
    const imageCategories = [
      'abstract', 'art', 'books', 'education', 'fantasy', 'history',
      'literature', 'mystery', 'nature', 'philosophy', 'poetry', 'science',
      'technology', 'travel', 'writing'
    ];

    let updateCount = 0;

    for (const dup of duplicateImages) {
      console.log(`\n📷 Processing duplicate image: ${dup.image}`);
      console.log(`   Used by ${dup.bookIds.length} books`);

      // Keep the first book with the original image, update the rest
      const [keepBookId, ...updateBookIds] = dup.bookIds;

      for (let i = 0; i < updateBookIds.length; i++) {
        const bookId = updateBookIds[i];
        const book = books.find(b => b._id.toString() === bookId.toString());

        // Generate a unique image URL
        let newImage;
        let attempts = 0;
        do {
          const category = imageCategories[Math.floor(Math.random() * imageCategories.length)];
          const imageId = Math.floor(Math.random() * 1000) + 1;
          newImage = `https://images.unsplash.com/photo-${1500000000000 + imageId}?w=400&h=600&fit=crop&auto=format`;
          attempts++;
        } while (usedImages.has(newImage) && attempts < 10);

        usedImages.add(newImage);

        booksToUpdate.push({
          id: bookId,
          title: book.title,
          oldImage: dup.image,
          newImage: newImage
        });

        updateCount++;
      }
    }

    // Update books in database
    if (booksToUpdate.length > 0) {
      console.log(`\n🔄 Updating ${booksToUpdate.length} books with unique cover images...`);

      for (const bookUpdate of booksToUpdate) {
        try {
          await Book.findByIdAndUpdate(bookUpdate.id, {
            coverImage: bookUpdate.newImage
          });
          console.log(`✅ Updated: "${bookUpdate.title}"`);
        } catch (error) {
          console.error(`❌ Failed to update "${bookUpdate.title}":`, error.message);
        }
      }

      console.log(`\n🎉 Successfully updated ${updateCount} books with unique cover images!`);
    } else {
      console.log('\n✅ No updates needed - all books already have unique cover images!');
    }

    // Verify the fix
    console.log('\n🔍 Verifying uniqueness...');
    const updatedBooks = await Book.find({}, 'title coverImage').sort({title: 1});
    const verifyImageUsage = new Map();

    updatedBooks.forEach(book => {
      const image = book.coverImage || 'NO_IMAGE';
      if (!verifyImageUsage.has(image)) {
        verifyImageUsage.set(image, []);
      }
      verifyImageUsage.get(image).push(book.title);
    });

    const stillDuplicates = Array.from(verifyImageUsage.entries())
      .filter(([image, titles]) => titles.length > 1);

    if (stillDuplicates.length === 0) {
      console.log('✅ SUCCESS: All books now have unique cover images!');
    } else {
      console.log(`⚠️  WARNING: Still found ${stillDuplicates.length} duplicate image groups`);
      stillDuplicates.forEach(([image, titles]) => {
        console.log(`   ${image} used by: ${titles.join(', ')}`);
      });
    }

    console.log(`\n📊 Final stats:`);
    console.log(`   Total books: ${updatedBooks.length}`);
    console.log(`   Unique images: ${verifyImageUsage.size}`);
    console.log(`   Duplicate groups: ${stillDuplicates.length}`);

    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

connectDB();