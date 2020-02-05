const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    period: {
        type: String
    },
    time: {
        type: String
    },
    participants: {
        type: Array
    },
    participantsNumber: {
        type: Number
    },
    waitingList: {
        type: Boolean,
        default: false
    },
    owner: {
        type: String
    },
    coordinates: {
        type: Array
    },
    status: {
        type: Boolean
    },
    warnings: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Event', eventSchema);
