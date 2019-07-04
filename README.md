## Create BackEnd Server

Step1: Create Server Folder
Step2: Inside the server folder run [npm init --yes] This command create package.json file inside the server folder
Step3: Install dependency cmd [npm install express body-parser --save] 
Express is a web-server,
body parser is middelware to handle form data such us handle form data / login form
Step4: Create server.js file
Step5: Past Below code:
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000

const app = express();

app.use(bodyParser.json())

app.get('/',  function(req, res){
    res.send('Hello from server')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT);
})

Step6: run server [node server]
