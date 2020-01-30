const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    localisation: {
        type: String,
        required: true
    },
    interests: {
        type: Array,
        required: true
    },
    warnings: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);