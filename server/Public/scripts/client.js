$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    getCalculation();

    //TODO add listener for opButtons
    //$('#opButton').on('click', buttonClick);
    //TODO add listener for submit '=' button
}

//GET
function getCalculation() {
    $.ajax({
        url: '/calculation',
        method: 'GET'
    })
    .then((response) => {
        console.log('calculation data', response);
        render(response);
    }).catch((response) => {
        alert('request failed');
    });
}

function render(response) {
    console.log('in render()', response);
    //empty history elements
    $('#historyHere').empty();
    //TODO cycle through all objects and append to DOM
    for (let i=0; i < response.length; i++) {
        let result = "";
        result = response[i].num1 + response[i].operator + response[i].num2 + '=' + response[i].result
        $('#historyHere').append(`
        <li>${result}</li>
        `)
        //display last answer on DOM
        if(i === (response.length-1)) {
            $('#answerHere').empty();
            $('#answerHere').append(response[i].result);
        }
    }
}

//TODO POST
