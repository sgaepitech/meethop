const express = require('express');
var router = express.Router();
require('../models/user.model');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const path = require('path');
const bcrypt = require('bcrypt');
const authRegister = require('../auth/register.validator');
const authLogin = require('../auth/login.validator');
const auth = require("../middleware/auth");

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
    await User.findOne(
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
                    await bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        await newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                const token = newUser.generateAuthToken();
                    res.header("x-auth-token", token).send({
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email
                    });
                });
        }
    });
});


// #############
// # READ USER #
// #############

// router.get('/read', (req, res) => {
//     User.find({_id: req.user._id}, (err, user) =>{
//         if (err) res.status(400).send(err)
//         console.log(user);
//         res.json(user[0].login)
//         })
//     });

// ############################################ fonctionnel
// router.route('/read/:id').get(function(req, res) {
//     let id = req.params.id;
//     User.findById(id, function(err, user) {
//         res.json(user);
//         });
//     });

// TESTING AUTH STUFF ##################################
router.get("/read", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
});


// ###############
// # UPDATE USER #
// ###############

router.route('/update/:id').put((req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err)
            return next(error);
        else {
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.password) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        });
                    });
            }
            if (req.body.description) {
                user.description = req.body.description;
            }
            if (req.body.location) {
                user.location = req.body.location;
            }
            if (req.body.interests) {
                user.interests = req.body.interests;
            }
            
            user.save();
            res.status(200).json({_id: req.params.id, username: user.username, email: user.email, password: user.password});
            }
        });
    });


// ###############
// # DELETE USER #
// ###############

router.route('/delete/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err)
            return next(error);
        else {
            res.status(200).json({msg: user});
            }
        });
    });




router.post("/login", (req, res) => {
    const { errors, isValid } = authLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        // console.log(user.email);
        if (!user) {
            return res.status(404).json({ loginnotfound: "Login not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // const payload = {_id: user._id, login: user.login }
                const accessToken = user.generateAuthToken();
                res.header("x-auth-token", accessToken).send({
                    _id: user._id,
                    username: user.username,
                    email: user.email
                });
                // res.json({accessToken: accessToken})
                res.json({accessToken: "login ok"})
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;