// Connect to database first, then start server
require('dotenv').config();
const connectDB = require('./config/database');

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    const express = require('express');
    const cors = require('cors');
    const errorHandler = require('./middleware/errorHandler');

    const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/library', require('./routes/library'));
app.use('/api/users', require('./routes/userRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'PagePicks API is running!' });
});

// Error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
} catch (error) {
console.error('❌ Failed to start server:', error);
process.exit(1);
}
};

// Start the server
startServer();