const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/event.model');
const Event = mongoose.model('Event');
const eventValidator = require('../auth/event.validator');
const auth = require("../auth/auth");

mongoose.set('useFindAndModify', false);


// ################
// # CREATE EVENT #
// ################

router.post("/create", auth, (req, res) => {
    const { errors, isValid } = eventValidator(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            owner: req.body.ower
    }); 

    newEvent
        .save()
        .then(event => res.json(event))
        .catch(err => console.log(err));
});

