const mongoose = require('mongoose');
require('dotenv').config();

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

// List all collections
const listCollections = async () => {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('\n📋 Available Collections:');
    collections.forEach(collection => {
        console.log(`  - ${collection.name}`);
    });
    return collections;
};

// Show collection stats
const showCollectionStats = async (collectionName) => {
    const db = mongoose.connection.db;
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments();
    console.log(`\n📈 ${collectionName} Collection:`);
    console.log(`  Total documents: ${count}`);

    if (count > 0) {
        const sample = await collection.findOne({});
        console.log(`  Sample document keys: ${Object.keys(sample).join(', ')}`);
    }
};

// Show all documents in a collection
const showAllDocuments = async (collectionName, limit = 10) => {
    const db = mongoose.connection.db;
    const collection = db.collection(collectionName);

    console.log(`\n📄 Documents in ${collectionName} (limit: ${limit}):`);
    const documents = await collection.find({}).limit(limit).toArray();

    documents.forEach((doc, index) => {
        console.log(`\n--- Document ${index + 1} ---`);
        // Remove sensitive fields for display
        const cleanDoc = { ...doc };
        if (cleanDoc.password) cleanDoc.password = '***HIDDEN***';
        console.log(JSON.stringify(cleanDoc, null, 2));
    });
};

// Main exploration function
const exploreDatabase = async () => {
    console.log('🔍 PagePicks Database Explorer');
    console.log('==============================');

    // Connect to database
    await connectDB();

    // List collections and show stats
    await showDatabaseStats();

    // Set up watchers for real-time updates
    await setupCollectionWatchers();

    console.log('\n🔄 Database explorer is now watching for changes...');
    console.log('📝 Try registering a new user or adding books to library');
    console.log('❓ Commands:');
    console.log('  refresh - Show current stats');
    console.log('  users - Show all users');
    console.log('  books - Show all books');
    console.log('  library - Show all library entries');
    console.log('  exit - Exit explorer');
};

// Show database stats
const showDatabaseStats = async () => {
    const collections = await listCollections();

    console.log('\n📊 Current Database Stats:');
    console.log('========================');

    // Show stats for each collection
    for (const collection of collections) {
        await showCollectionStats(collection.name);
    }
};

// Set up real-time collection watchers
const setupCollectionWatchers = async () => {
    const db = mongoose.connection.db;

    // Watch users collection
    const usersCollection = db.collection('users');
    const usersWatcher = usersCollection.watch();

    usersWatcher.on('change', (change) => {
        console.log('\n👤 Users Collection Updated:');
        if (change.operationType === 'insert') {
            console.log('  ➕ New user registered:', change.fullDocument.username);
        }
        showCollectionStats('users');
    });

    // Watch userlibraries collection
    const librariesCollection = db.collection('userlibraries');
    const librariesWatcher = librariesCollection.watch();

    librariesWatcher.on('change', (change) => {
        console.log('\n📚 Library Collection Updated:');
        if (change.operationType === 'insert') {
            console.log('  ➕ Book added to library');
        } else if (change.operationType === 'delete') {
            console.log('  ➖ Book removed from library');
        }
        showCollectionStats('userlibraries');
    });

    console.log('✅ Real-time watchers active for users and library collections');
};

// Interactive command handler
const handleCommands = async () => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuestion = (query) => {
        return new Promise(resolve => rl.question(query, resolve));
    };

    try {
        while (true) {
            const command = await askQuestion('\nEnter command (refresh/users/books/library/exit): ');

            switch (command.toLowerCase()) {
                case 'refresh':
                    await showDatabaseStats();
                    break;
                case 'users':
                    await showAllDocuments('users', 1000);
                    break;
                case 'books':
                    await showAllDocuments('books', 1000);
                    break;
                case 'library':
                    await showAllDocuments('userlibraries', 1000);
                    break;
                case 'exit':
                    console.log('👋 Goodbye!');
                    rl.close();
                    return;
                default:
                    console.log('❓ Unknown command. Available: refresh, users, books, library, exit');
            }
        }
    } catch (error) {
        console.error('Error in command handler:', error);
    } finally {
        rl.close();
    }
};

// Handle process termination
process.on('SIGINT', async () => {
    console.log('\n👋 Closing database connection...');
    await mongoose.connection.close();
    console.log('✅ Connection closed');
    process.exit(0);
});

// Run the explorer
if (require.main === module) {
    exploreDatabase().then(() => {
        console.log('\n🎯 Starting interactive mode...');
        return handleCommands();
    }).catch(console.error);
}

module.exports = {
    connectDB,
    listCollections,
    showCollectionStats,
    showAllDocuments,
    exploreDatabase
};