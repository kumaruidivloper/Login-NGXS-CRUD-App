## JWT TOKEN Generating

Step21: Install JWT Token Package inside server folder [npm install jsonwebtoken --save]

Step22: Paste Below code in api.js

const express = require('express');
const jwt = require('jsonwebtoken');
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
            let payload = { subject: registeredUser.id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

// Login Router Function
router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid Email')
            } else if (user.password !== userData.password  ) {
                res.status(401).send('Invalid password')
            } else {
                let payload = {subject: user._id}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

module.exports = router;

## Authentication-Sequence-Diagram
![Authentication-Sequence-Diagram](https://user-images.githubusercontent.com/30646609/60685588-7d535200-9ec1-11e9-85e8-fb50fb1f17b9.JPG)

## JSON-Web-Tokens
![JSON-Web-Tokens](https://user-images.githubusercontent.com/30646609/60685596-88a67d80-9ec1-11e9-8b33-836841357e51.JPG)
