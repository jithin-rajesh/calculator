
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let currentNum = "";
let oldNum = "";
let currentOperator = "";

function operate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (operator === "+") return parseFloat(add(num1, num2).toFixed(8)); 
    if (operator === "-") return parseFloat(subtract(num1, num2).toFixed(8)); 
    if (operator === "*") return parseFloat(multiply(num1, num2).toFixed(8)); 
    if (operator === "/" && num2 !== 0) 
        return parseFloat(divide(num1, num2).toFixed(8)); 
    if (operator === "/" && num2 === 0) 
        return "null"; 
    
}

function fillText(num) {
    if (num === '.' && currentNum.includes('.')) return; 
    currentNum += "" + num;
    answerText.textContent = exponential(currentNum);
}

function exponential(num) {
    if (Math.abs(num) > 999999999 || Math.abs(num) < 0.0001) {
        return Number.parseFloat(num).toExponential(4); 
    }
    return num.toString().slice(0, 9); 
}

function handleNumberClick(e) {
    fillText(e.target.id);
}

function handleOperatorClick(e) {
    setOperator(e.target.id);
}

function setOperator(operator) {
    currentOperator = operator;
    operatorDisplay.textContent = currentOperator;

    if (!oldNum) {
        oldNum = currentNum;
        currentNum = "";
    } else if (currentNum) {
        let result = operate(oldNum, currentNum, currentOperator);
        answerText.textContent = exponential(result);
        oldNum = result;
        currentNum = "";
    }
}

function handleEqualsClick() {
    if (!oldNum || !currentNum) return;
    let result = operate(oldNum, currentNum, currentOperator);
    answerText.textContent = exponential(result);
    
    if (result !== "null") {
        currentNum = result.toString();
        oldNum = "";
        currentOperator = "";
        operatorDisplay.textContent = "";
    }
}

function handleClearClick() {
    currentNum = "";
    oldNum = "";
    answerText.textContent = '0';
    currentOperator = "";
    operatorDisplay.textContent = "";
}

function handleDeleteClick() {
    if (currentNum) {
        if (currentNum.length > 1) {
            currentNum = currentNum.slice(0, -1);
            answerText.textContent = exponential(currentNum);
        } else {
            currentNum = '';
            answerText.textContent = '0';
        }
    }
}

function handleNegationClick() {
    if (currentNum && currentNum !== '0') {
        currentNum = (parseFloat(currentNum) * -1).toString();
        answerText.textContent = exponential(currentNum);
    } 
}

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let answerText = document.querySelector(".answer");
let operatorDisplay = document.querySelector(".display");

numbers.forEach(number => number.addEventListener("click", handleNumberClick));
operators.forEach(operator => operator.addEventListener("click", handleOperatorClick));

let equals = document.querySelector(".equal");
equals.addEventListener('click', handleEqualsClick);

let clearFull = document.querySelector("#clear");
clearFull.addEventListener('click', handleClearClick);

let clear = document.querySelector("#delete");
clear.addEventListener('click', handleDeleteClick);

let negation = document.querySelector("#negation");
negation.addEventListener('click', handleNegationClick);

window.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') {
        fillText(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        setOperator(e.key);
    } else if (e.key === 'Backspace') {
        handleDeleteClick();
    } else if (e.key === '=' || e.key === 'Enter') {
        handleEqualsClick();
    }
    equals.focus();
});

