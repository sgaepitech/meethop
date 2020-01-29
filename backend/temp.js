const mongoose = require('mongoose');
const Schema = mongoose.Schema;let User = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    description: {
        type: String
    },
    localisation: {
        type: String
    },
    interests: {
        type: Array
    },
    warnings: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Array,
        default: true
    }
});module.exports = mongoose.model('User', User);