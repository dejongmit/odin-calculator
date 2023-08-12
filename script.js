// Variables & Page Elements
let leftVal = 0;
let operator = "";
let rightVal = 0;
let displayVal = "";
const displaySpan = document.querySelector('.displayVal')
const clearButton = document.querySelector('.clear');
const pointButton = document.querySelector('.point');
const digitButtons = document.querySelectorAll('.digit');
const operandButtons = document.querySelectorAll('.operand');


// Functions
function display(int) {
    if(displayVal === "0"){ //If display is already zero, don't concatenate
        if(int === ".") { //If incoming value is a decimal, include a leading zero
            displayVal = "0."
            displaySpan.textContent = displayVal;
        } else {
            displayVal = int.toString();
            displaySpan.textContent = displayVal;
        }
    } else{
        displayVal += int.toString();
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

function operate (oprLeftVal, operator, oprRightVal) {
    switch (operator) {
        case "+":
            return add(oprLeftVal, oprRightVal);
        case "-":
            return subtract(oprLeftVal, oprRightVal);
        case "*":
            return multiply(oprLeftVal, oprRightVal);
        case "/":
            return divide(oprLeftVal, oprRightVal);
        default:
            throw new Error("Error: Operator not understood!");
    }
}

// Event Listeners
clearButton.addEventListener('click', () => {
    displayVal = "0" //clear the display, then push a 0 onto it
    display("0");
});

pointButton.addEventListener('click', () => { 
    if(displayVal.includes(".")) { //check to see if a decimal has already been placed
        return null;
    } else {
        display(".")
    }
});

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(operator === "") {
            display(parseInt(button.textContent));
            if(displayVal.includes(".")) { //use float if there is a decimal
                leftVal = parseFloat(displayVal);
            } else {
                leftVal = parseInt(displayVal);
            }
            console.log(leftVal);
        } else {
            operator = ""; 
            //TO DO: FIGURE OUT WHAT TO DO IF THERE'S MATH SUPPOSED TO HAPPEN
            // display(button.textContent)
        }
    })
});

operandButtons.forEach((button) => {
    button.addEventListener('click', () => {operator = button.textContent;})
});

