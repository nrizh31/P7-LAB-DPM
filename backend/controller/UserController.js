const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validasi input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Validasi panjang password
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Cek apakah email atau username sudah digunakan
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'Email or username already registered' });
        }

        // Simpan user baru tanpa enkripsi
        const user = await User.create({
            username,
            email,
            password, // Password disimpan langsung
        });

        if (user) {
            return res.status(201).json({ message: 'User registered successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};



// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Cari user berdasarkan username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Cocokkan password
        const isMatch = user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Kirimkan respons berhasil
        const responseData = {
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), // Fungsi generateToken tetap
        };

        console.log('Login response:', responseData); // Debug data respons
        res.json(responseData);
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};




// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
