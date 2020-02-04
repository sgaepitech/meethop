const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
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
    location: {
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

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
}

// mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);