const express = require('express');
const router = express.Router();

// User Login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

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
        res.send('passed');
    }
});

module.exports = router;