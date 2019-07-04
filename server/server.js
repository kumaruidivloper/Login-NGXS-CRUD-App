const express = require('express');
const bodyParser = require('body-parser');
// CORS Issue Fix - 1
const cors = require('cors')

const PORT = 5000
// Tell our server use this route 
const api = require('./routes/api');
const app = express();

// CORS Issue Fix - 2
app.use(cors());


app.use(bodyParser.json())

app.use('/api', api);
app.get('/',  function(req, res){
    res.send('Hello from server')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT);
})