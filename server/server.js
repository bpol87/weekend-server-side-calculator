const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];
let stdCalculations = [];


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  console.log('GET /calculate received a request!');
  res.send(calculations);
})

// POST /calculations
app.post('/calculations', (req, res) => {
  console.log('\treq.body is:', req.body);
  
  calcExp(req.body);
  console.log('\tnew req.body is:', req.body);
  calculations.push(req.body);
console.log('\tnew calculations are:', calculations);

  res.sendStatus(201);
})

function calcExp(req) {
  if (req.operator === '+') {
  req.result = req.numOne + req.numTwo;
} else if (req.operator === '-') {
  req.result = req.numOne - req.numTwo;
} else if (req.operator === '*') {
  req.result = Math.round((req.numOne * req.numTwo) * 100)/100;
} else if (req.operator === '/') {
  req.result = Math.round((req.numOne / req.numTwo) * 100)/100;
}
}
// STANDARD CALCULATOR FUNCTIONS
function stdCalcExp(req){
  if (req.operator === '+') {
    req.result = req.numOne + req.numTwo;
  } else if (req.operator === '-') {
    req.result = req.numOne - req.numTwo;
  } else if (req.operator === '*') {
    req.result = Math.round((req.numOne * req.numTwo) * 10000000)/10000000;
  } else if (req.operator === '/') {
    req.result = Math.round((req.numOne / req.numTwo) * 10000000)/10000000;
  }
}
//STANDARD CALCULATOR GET AND POST CALLS
app.get('/calculate', (req, res) => {
  console.log('GET /calculate received a request!');
  res.send(stdCalculations);
})

app.post('/calculate', (req, res) => {
  console.log('\treq.body is:', req.body);
  
  stdCalcExp(req.body);
  console.log('\tnew req.body is:', req.body);
  stdCalculations.push(req.body);
console.log('\tnew calculations are:', stdCalculations);

  res.sendStatus(201);
})


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
