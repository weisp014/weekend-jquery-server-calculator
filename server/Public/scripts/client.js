$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    getCalculation();

    //TODO add listener for opButtons
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
    //TODO empty elements

    //TODO cycle through all objects and append to DOM
    for (let i=0; i < response.length; i++) {
        $('historyHere').append(`
        <li>${response[i]}</li>
        `)
    }

}

//TODO POST
