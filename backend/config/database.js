const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if MongoDB URI is provided
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set');
        }

        // Set connection options for better reliability
        const options = {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, options);

        console.log(`✅ MongoDB Connected Successfully`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🌐 Host: ${conn.connection.host}`);
        console.log(`🔌 Port: ${conn.connection.port}`);
        console.log(`📍 Ready State: ${conn.connection.readyState}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);

        // Provide helpful debugging information
        if (error.message.includes('authentication failed')) {
            console.error('💡 Check your MongoDB username and password');
        } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
            console.error('💡 Check your MongoDB URI and network connection');
        } else if (error.message.includes('connection timed out')) {
            console.error('💡 Check your MongoDB server status and firewall settings');
        }

        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed through app termination');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
        process.exit(1);
    }
});

module.exports = connectDB;