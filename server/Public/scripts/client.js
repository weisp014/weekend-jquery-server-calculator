$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    getCalculation();

    //add listener for submit '=' button
}

//GET
function getCalculation() {
    $.ajax({
        url: '/calculation',
        method: 'GET'
    })
    .then((response) => {
        console.log('calculation data', response);
    })
}

//TODO POST
