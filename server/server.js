const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

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

//TODO calculate and return result from incoming calculation
function computeResult(equation) {
    console.log('in computeResult()');
    let result = 0;
    let operation = equation.operator;
    //check operator and calculate result
    switch (operation) {
        case '+':
            console.log('addition detected');
            result = (Number(equation.num1) + Number(equation.num2));
            console.log(result);
            break
        case '-':
            console.log('subtraction detected');
            result = (Number(equation.num1) - Number(equation.num2));
            console.log(result);
            break
        case '*':
            console.log('multiplication detected');
            result = (Number(equation.num1) * Number(equation.num2));
            console.log(result);
            break
        case '/':
            console.log('division detected');
            result = (Number(equation.num1) / Number(equation.num2));
            console.log(result);
            break
        default:
            console.log('Error: unexpected operator');
    }
}

//routes

//GET
app.get('/calculation', (req, res) => {
    console.log('request for /calculation was made');
    //send back array of calculations
    res.send(history);
});

//TODO POST
app.post('/calculation', (req, res) => {
    console.log('Get a POST request', req.body);

    //grab new calculation from request body
    let newCalculation = req.body;

    //calculate result and add as new property
    newCalculation.result = computeResult(newCalculation);

    //add to the history array
    history.push(newCalculation);

    //send back status code
    res.sendStatus(201);
})
