// Variables & Page Elements
let leftVal = 0;
let operator = "";
let rightVal = 0;
let currentVal = 0;
let displayVal = "";
let operatorPressed = false;
const ELEMENT_FLASH_IN_MILLISECONDS = 25;
const displayScreen = document.querySelector('.display');
const displayInputSpan = document.querySelector('.displayVal');
const displayEquationSpan = document.querySelector('.displayEquation')
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.point');
const digitButtons = document.querySelectorAll('.digit');
const operandButtons = document.querySelectorAll('.operand');
const allButtons = document.querySelectorAll('button');


// Functions
function display(int) { //TO DO: SET MAXIMUM DISPLAY LENGTH
    if(displayVal === "0"){ //If display is already zero, don't concatenate
        if(int === ".") { //If incoming value is a decimal, include a leading zero
            displayVal = "0."
            displayInputSpan.textContent = displayVal;
        } else {
            displayVal = int.toString();
            displayInputSpan.textContent = displayVal;
        }
    } else{
        displayVal += int.toString();
        displayInputSpan.textContent = displayVal;
    }
}

function setCurrentVal() {
    if(displayVal.includes(".")) { //use float if there is a decimal
        currentVal = parseFloat(displayVal);
    } else {
        currentVal = parseInt(displayVal);
    }
}

function clearCalculator() {
    leftVal = 0;
    operator = "";
    operatorPressed = false;
    displayScreen.setAttribute("class", `${displayScreen.getAttribute("class")} pressed`);
        setTimeout(() => { // wait to remove the playing class
            displayScreen.setAttribute("class", `${displayScreen.getAttribute("class").replace(" pressed", "")}`)
        }, ELEMENT_FLASH_IN_MILLISECONDS);
}

function operate (oprLeftVal, operator, oprRightVal) {
    switch (operator) {
        case "+":
            return oprLeftVal + oprRightVal
        case "-":
            return oprLeftVal - oprRightVal
        case "*":
            return oprLeftVal * oprRightVal
        case "/":
            if (oprRightVal === 0) { //error on divide by 0
                setCurrentVal();
                displayInputSpan.textContent = 'Error!';
                throw new Error("Error: Can't divide by 0!");
            } else {
                return oprLeftVal /  oprRightVal
            }
        default:
            throw new Error("Error: Operator not understood!");
    }
}

// Event Listeners
clearButton.addEventListener('click', () => {
    if(displayVal === "0"){ //perform a full clear of variables
        clearCalculator();
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
        } else { // operand chosen, save leftVal and reset the display to parse value into currentVal again
            leftVal = currentVal;
            displayVal = "0";
            operatorPressed = false;
            display(parseInt(button.textContent));
            setCurrentVal();
        }
    })
});

operandButtons.forEach((button) => { //TO DO: Hitting "=" before both operands are selected should run the operate function with one set as 0
    button.addEventListener('click', () => {
        if (operator === "") { //No operation specified yet, save what was chosen for later
            if(button.textContent === "="){
                return null;
            } else {
                operator = button.textContent;
                displayEquationSpan.textContent = `${currentVal} ${operator}`
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
            displayEquationSpan.textContent = `${currentVal} ${operator}`
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
        }, ELEMENT_FLASH_IN_MILLISECONDS);
    });
})

//TO DO: Add keyboard support

//TO DO: Add percent support

//TO DO: Add sign support