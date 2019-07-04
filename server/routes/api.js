const express = require('express');
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose')

// DB Connection String
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"

// DB Connection function
mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err);
    } else {
        console.log('connected to mongodb')
    }
})

router.get('/', (req, res)=> {
    res.send('From API Route')
})


// Register Router Function
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

module.exports = router;