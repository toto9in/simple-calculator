//variables 

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;
let powSymbol = '^';




//getElement

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('deleteButton');
const powButton = document.getElementById('powButton');
const percentButton = document.getElementById('percentButton');
const pointButton = document.getElementById('pointButton');
const lastScreen = document.getElementById('lastScreen');
const currentScreen = document.getElementById('currentScreen');
const equalsButton = document.getElementById('equalsButton');







//eventListeners
numberButtons.forEach((button) =>
button.addEventListener('click', () => addNumScreen(button.textContent))
);

operatorButtons.forEach((button) =>
button.addEventListener('click', () => addOptScreen(button.textContent))
);

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', addPoint);
powButton.addEventListener('click', () => addOptScreen(powSymbol))
percentButton.addEventListener('click', percent);



//logic

function addNumScreen(num){
    if(currentScreen.textContent === '0' || shouldResetScreen){
        resetScreen();
    }
    currentScreen.textContent += num;
}

function addOptScreen(operator){
    if(currentOperation !== null) evaluate();
    firstOperand = currentScreen.textContent;
    currentOperation = operator;
    lastScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;


}

function addPoint(){
    if(shouldResetScreen){
        resetScreen();
    }
    if(currentScreen.textContent === ''){
        currentScreen.textContent = '0';
    }
    if(currentScreen.textContent.includes('.')){
        return
    }
    currentScreen.textContent += '.';
}

function evaluate(){
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondOperand = currentScreen.textContent
    lastScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
        )
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }


function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1)


  }

function clear(){
    currentScreen.textContent = '0';
    lastScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;

}

function resetScreen(){
    currentScreen.textContent = '';
    shouldResetScreen = false;
}

function invertNum(){
    currentScreen.textContent = 'negao';
}



function percent(){
    currentScreen.textContent = currentScreen.textContent / 100;
}


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function pow(num1, num2){
    return Math.pow(num1, num2)
}

function operate(operator, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
            if(num2 === 0) return null;
            else return divide(num1, num2);
        case '^':
            return pow(num1, num2);
        default:
            return null;
    }
}