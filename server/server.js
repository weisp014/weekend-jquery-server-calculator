const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//array of all historical calculations
let history = [
    {
        num1: 5,
        num2: 8,
        operator: '+',
        result: 13,
    },
    {
        num1: 4,
        num2: 8,
        operator: '+',
        result: 12,
    }
];

//start listening
app.listen(PORT, () => {
    console.log('server running on port', PORT);
});

//routes

//GET
app.get('/calculation', (req, res) => {
    console.log('request for /calculation was made');
    //send back array of calculations
    res.send(history);
});

//TODO POST
