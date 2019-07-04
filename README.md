## Create BackEnd Server Routes-Api

Step1: Create routes folder inside the server folder then routes --> api.json then create api.json inside routes folder

Step2: Past Below code in api.json file

const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send('From API Route')
})

module.exports = router;

Step3: Tell our server use this route go-back to server

[add below code in server.js]
const api = require('./routes/api')

app.use('/api', api);
Paste Above this method
app.get('/',  function(req, res){
    res.send('Hello from server')
})

Step4: Restart the node server then open http://localhost:3000/api
