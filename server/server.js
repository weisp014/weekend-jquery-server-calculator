const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//array of all historical calculations
let history = [
    // { Example:
    //     num1: 5,
    //     num2: 8,
    //     operator: '+',
    //     result: 13,
    // }
];

//start listening
app.listen(PORT, () => {
    console.log('server running on port', PORT);
});

//calculate and return result from incoming calculation
function computeResult(equation) {
    console.log('in computeResult()');
    let newResult = 0;
    let operation = equation.operator;
    //check operator and calculate result
    switch (operation) {
        case '+':
            console.log('addition detected');
            newResult = (Number(equation.num1) + Number(equation.num2));
            console.log(newResult);
            break
        case '-':
            console.log('subtraction detected');
            newResult = (Number(equation.num1) - Number(equation.num2));
            console.log(newResult);
            break
        case '*':
            console.log('multiplication detected');
            newResult = (Number(equation.num1) * Number(equation.num2));
            console.log(newResult);
            break
        case '/':
            console.log('division detected');
            newResult = (Number(equation.num1) / Number(equation.num2));
            console.log(newResult);
            break
        default:
            console.log('Error: unexpected operator');
    }
    equation.result = newResult;
    console.log('equation', equation);
    return equation;
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

    //calculate result and add new calculation to history array
    history.push(computeResult(newCalculation));

    //send back status code
    res.sendStatus(201);
})
