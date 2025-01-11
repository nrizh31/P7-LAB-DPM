const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a username'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
    },
    {
        timestamps: true,
    }
);

// Fungsi untuk mencocokkan password tanpa enkripsi
userSchema.methods.matchPassword = function (enteredPassword) {
    return this.password === enteredPassword;
};

module.exports = mongoose.model('User', userSchema);
