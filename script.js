// Variables & Page Elements
let leftVal = 0;
let operator = "";
let rightVal = 0;
let currentVal = 0;
let displayVal = "";
let operatorPressed = false;
const displaySpan = document.querySelector('.displayVal')
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.point');
const digitButtons = document.querySelectorAll('.digit');
const operandButtons = document.querySelectorAll('.operand');
const allButtons = document.querySelectorAll('button');


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

function setCurrentVal() {
    if(displayVal.includes(".")) { //use float if there is a decimal
        currentVal = parseFloat(displayVal);
    } else {
        currentVal = parseInt(displayVal);
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
    if(displayVal === "0"){ //perform a full clear of variables
        leftVal = 0;
        operator = "";
        operatorPressed = false;
    }
    displayVal = "0" //clear the display, and reset the current val
    display("0");
    setCurrentVal();
});

decimalButton.addEventListener('click', () => { 
    if (operatorPressed){
        leftVal = currentVal;
        displayVal = "0"
        display(".");
        setCurrentVal();
    } else {
        if(displayVal.includes(".")) { //check to see if a decimal has already been placed
            return null;
        } else {
            display(".")
        }
    }
});

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(!operatorPressed || currentVal === 0) { //continue to store currentVal as what gets parsed from the display
            display(parseInt(button.textContent));
            setCurrentVal();
        } else { // operand chosen, save leftVal + operator selection and reset the display to parse value into currentVal again
            leftVal = currentVal;
            displayVal = "0";
            operatorPressed = false;
            display(parseInt(button.textContent));
            setCurrentVal();
        }
    })
});

operandButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === "") { //No operation specified yet, save what was chosen for later
            if(button.textContent === "="){
                return null;
            } else {
                operator = button.textContent;
                operatorPressed = true;
            }
        } else { // Use previously selected operator to execute math and set the output as the new left val
            rightVal = currentVal;
            let calculated = operate(leftVal, operator, rightVal);
            displayVal = "0"; //reset displayVal to stop any concat happening on the display
            display(calculated);
            setCurrentVal();
            if(button.textContent === "="){
                operator = "";
                operatorPressed = false;
            } else {
                operator = button.textContent;
                operatorPressed = true;
            }
            leftVal = calculated;
            rightVal = 0;
        }
    })
});

allButtons.forEach((button) => { //TO DO: FIGURE OUT BETTER WAY TO ANIMATE BUTTON PRESSED GREY OVERLAY
    button.addEventListener('click', () => {
        button.setAttribute("class", `${button.getAttribute("class")} pressed`);
        setTimeout(() => { // wait to remove the playing class
            button.setAttribute("class", `${button.getAttribute("class").replace(" pressed", "")}`)
        }, 25);
    });
})