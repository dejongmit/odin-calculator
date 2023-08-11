// Variables & Page Elements
let firstNum = 0
let operator = "";
let lastNum = 0;
let displayVal = "";
const displaySpan = document.querySelector('.displayVal')
const digitButtons = document.querySelectorAll('.digit');
const clearButton = document.querySelector('.clear');

// Functions
function display(value) {
    if(displayVal === "0"){
        displayVal = value;
        displaySpan.textContent = displayVal;
    } else {
    displayVal += value;
    displaySpan.textContent = displayVal;
    }
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

function operate (firstNum, operator, lastNum) {
    switch (operator) {
        case "+":
            return add(firstNum,lastNum);
        case "-":
            return subtract(firstNum, lastNum);
        case "*":
            return multiply(firstNum, lastNum);
        case "/":
            return divide(firstNum, lastNum);
        default:
            throw new Error("Error: Operator not understood!");
    }
}

// Event Listeners
clearButton.addEventListener('click', () => {
    displayVal = "";
    display(0);
});

digitButtons.forEach((button) => {
    button.addEventListener('click',() => {display(button.textContent)})
});

