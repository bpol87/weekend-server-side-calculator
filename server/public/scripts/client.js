console.log('client.js is sourced!');

function onReady() {
    fetchCalc();
}

onReady();

// VARIABLES
let calculationsHistory = [];
let viewer = document.getElementById('viewer-window');
let recentResult = document.getElementById('recent-result');
let resultHistory = document.getElementById('result-history');
let calcForm = document.getElementById('calculator-form');
let firstNumSection = document.getElementById('calculators');
let secondNumSection = document.getElementById('final-buttons');
let numberOne;
let operatorSign;
let numberTwo;

// FUNCTIONS
function addExpression(event, operator) {
    event.preventDefault();

    numberOne = Number(document.getElementById('numberOne').value);
    operatorSign = operator;
    viewer.style.display = 'block';
    viewer.innerText = `${numberOne} ${operatorSign}`;
    recentResult.innerHTML = '';
}

function calculateExpression(event) {
    event.preventDefault();

    numberTwo = Number(document.getElementById('numberTwo').value);

    viewer.innerText += ` ${numberTwo}`;

    let newCalc = {
        numOne: numberOne,
        numTwo: numberTwo,
        operator: operatorSign,
        result: '',
    }
    // console.log(newCalc);

    axios({
        method: 'POST',
        url: '/calculations',
        data: newCalc,
    })
        .then((response) => {
            console.log(response);
            fetchCalc();
        })
}

function fetchCalc() {
    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then((response) => {
            const calcs = response.data;
            console.log(calcs);

            resultHistory.innerHTML = '';
            viewer.innerHTML = '';

            recentResult.innerHTML = `<p class="result">${calcs[calcs.length - 1].result}</p>`;
            viewer.innerHTML = `${calcs[calcs.length - 1].numOne} ${calcs[calcs.length - 1].operator} ${calcs[calcs.length - 1].numTwo}`

            for (let i = 0; i < calcs.length; i++) {
                resultHistory.innerHTML += `
            <p class="history">${calcs[i].numOne} ${calcs[i].operator} ${calcs[i].numTwo} = ${calcs[i].result}</p> 
            `
            }
        })
}

function resetCalculator (event) {
    event.preventDefault();
    document.getElementById('numberOne').value = '';
    document.getElementById('numberTwo').value = '';
    viewer.style.display = 'none';
}