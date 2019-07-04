## Setting Up Mongoose

Step11: Create DB in MongoDB
Step12: open [mongoosejs.com]
Step13: install inside server folder [npm install --save mongoose]
Step14: create models folder inside server with in the modal folder create user.js file
Step15: Past below code in user.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users')

Step16: All the database request managed by in the api-route so the database connection happen in api.js
Step17: Past below code in api.js file
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"
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

module.exports = router;


Step18: Register new user routes in api.js file Past below code
const express = require('express');
const router = express.Router();
const user = require('../models/user');

const mongoose = require('mongoose')
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"
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


Step19: Create Login API  past below code api.json

const express = require('express');
const router = express.Router();
const user = require('../models/user');

const mongoose = require('mongoose')
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"
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

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).sent('Invalid Email')
            } else if (user.password !== userData.password  ) {
                res.status(401).send('Invalid password')
            } else {
                res.status(200).send(user)
            }
        }
    })
})

module.exports = router;

## Mongoose-DB-Connection-Image

![Mongoose-DB-Connection-Image](https://user-images.githubusercontent.com/30646609/60672643-84fc0200-9e93-11e9-8f57-dd7fabc25cf2.JPG)


## Angular_UI_App_Step
![Angular_UI_App_Step](https://user-images.githubusercontent.com/30646609/60674121-043f0500-9e97-11e9-8e4a-0bbf96bc633e.JPG)
