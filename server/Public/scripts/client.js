$(document).ready(onReady);

//keep track of operator clicked
let lastOperatorClicked = 0;

function onReady() {
    console.log('jquery loaded');
    getCalculation();

    //listener for opButtons
    $('.opButton').on('click', operatorClicked);
    //listener for submit '=' button
    $('#equalButton').on('click', sendCalculation);
    //listener for clear button
    $('#clearButton').on('click', clearInputs);
}

//clear inputs
function clearInputs() {
    $('#number1').val('');
    $('#number2').val('');
    lastOperatorClicked = 0;
}

//save which operator was clicked
function operatorClicked() {
    console.log('in operatorClicked');
    lastOperatorClicked = $(this).text();
}

//GET
function getCalculation() {
    $.ajax({
        url: '/calculation',
        method: 'GET'
    })
        .then((response) => {
            console.log('calculation history', response);
            render(response);
        }).catch((response) => {
            alert('request failed');
        });
}

function render(response) {
    console.log('in render()', response);
    //empty history elements
    $('#historyHere').empty();
    //cycle through all historical calculations and append to DOM
    for (let i = 0; i < response.length; i++) {
        let result = "";
        result = response[i].num1 + response[i].operator + response[i].num2 + '=' + response[i].result
        $('#historyHere').append(`
        <li>${result}</li>
        `)
        //display last answer on DOM
        if (i === (response.length - 1)) {
            $('#answerHere').empty();
            $('#answerHere').append(response[i].result);
        }
    }
}

//POST
function sendCalculation() {
    console.log('in sendCalculation()');
    let newCalculation = {};
    //get values from input fields
    newCalculation.num1 = $('#number1').val();
    newCalculation.num2 = $('#number2').val();
    newCalculation.operator = lastOperatorClicked;

    //check if all values are filled in before sending to server
    if (newCalculation.num1 && newCalculation.num2 && newCalculation.operator) {
        console.log(newCalculation);
        $.ajax({
            method: 'POST',
            url: '/calculation',
            data: newCalculation
        }).then((response) => {
            console.log('success', response);
            //get history of calculations from server
            getCalculation();
        }).catch((response) => {
            alert('request failed');
        })
    } else {
        alert('Not all inputs and operator filled in!');
    }
}
