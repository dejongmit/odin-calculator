let firstNum = 0
let operator = "";
let lastNum = 0;

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

console.log(operate(5,"+",5));
console.log(operate(5,"-",5));
console.log(operate(5,"*",5));
console.log(operate(5,"/",5));
console.log(operate(5,"d",5));