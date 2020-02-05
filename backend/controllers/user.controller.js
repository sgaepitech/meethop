const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/user.model');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const authRegister = require('../auth/register.validator');
const authLogin = require('../auth/login.validator');
const auth = require("../auth/auth");

mongoose.set('useFindAndModify', false);


// ###############
// # CREATE USER #
// ###############

router.post("/create", async (req, res) => {
    const { errors, isValid } = authRegister(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne(
            { email: req.body.email }
    )
    .then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    birthdate: req.body.birthdate,
                    location: req.body.location,
                    interests: req.body.interests
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, async (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// #############
// # READ USER #
// #############

router.get("/read", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
});


// ###############
// # UPDATE USER #
// ###############

router.put("/update", auth, (req, res, next) => {
    User.findById(req.user._id, (err, user) => {
        if (err)
            return next(error);
        else {
            if (req.body.username) { user.username = req.body.username; }
            if (req.body.email) { user.email = req.body.email; }
            if (req.body.password) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        });
                    });
            }
            if (req.body.description) { user.description = req.body.description; }
            if (req.body.location) { user.location = req.body.location; }
            if (req.body.interests) { user.interests = req.body.interests; }

            user.save();
            res.status(200).json({
                _id: req.user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                birthdate: user.birthdate,
                description: user.description,
                location: user.location,
                interests: user.interests
            });
        }
    });
});


// ###############
// # DELETE USER #
// ###############

router.delete("/delete", auth, (req, res, next) => {
    User.findByIdAndRemove(req.user._id, (err, user) => {
        if (err)
            return next(error);
        else {
            res.status(200).json({msg: user});
        }
    });
});


// ###############
// # LOGIN ROUTE #
// ###############

router.post("/login", (req, res) => {
    const { errors, isValid } = authLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const accessToken = user.generateAuthToken();
                res.header("x-auth-token", accessToken).send({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    birthdate: user.birthdate,
                    description: user.description,
                    location: user.location,
                    interests: user.interests
                });
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;
