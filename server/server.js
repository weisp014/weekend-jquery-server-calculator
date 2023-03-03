const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//array of all historical calculations
let history = [
    {
        
    }
];

//start listening
app.listen(PORT, () => {
    console.log('server running on port', PORT);
});

//routes
let calculations = [];

//GET
app.get('/calculation', (req, res) => {
    console.log('request for /calculation was made');
    //send back array of calculations
    res.send(calculations);
});

//TODO POST
