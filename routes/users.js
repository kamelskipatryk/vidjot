const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

// Login Form POST
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req, res, next);
})

// Register Form POST
router.post('/register', (req, res) => {
    let errors = [];

    if(req.body.password != req.body.confirm_password){
        errors.push({text:'Passwords do not match'});
    }

    if(req.body.password.length < 4){
        errors.push({text:'Password is too short, min. 4 characters'});
    }

    if(errors.length > 0){
        res.render('users/register',{
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        });
    } else {
        User.findOne({email: req.body.email})
         .then(user => {
             if(user){
                req.flash('error_msg', 'Email is currently using!');
                res.redirect('/users/register');
             } else {
                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                
                bcrypt.genSalt(10, (errors, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                         .then(user => {
                             req.flash('success_msg', 'You are now registered and can log in');
                             res.redirect('/users/login');
                         })
                         .catch(err => {
                             console.log(err);
                             return;
                         })
                    })
                });
             }
         })
    }
});

module.exports = router;