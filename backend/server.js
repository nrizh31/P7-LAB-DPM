const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import fungsi koneksi ke database

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS
app.use(express.json()); // Parsing body request dengan format JSON
app.use(express.urlencoded({ extended: false })); // Parsing body request dengan format URL-encoded

// Routes
app.use('/api/users', require('./routes/UserRoutes')); // Route untuk user-related API

// Default route (optional, bisa dihapus atau disesuaikan)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
