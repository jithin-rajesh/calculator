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
    if (operator === "/" && num2 !== 0) return parseFloat(divide(num1, num2).toFixed(8)); 
    return "Really Dude?";
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

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let answerText = document.querySelector(".answer");
let operatorDisplay = document.querySelector(".display");

operators.forEach((operator) => {
    operator.addEventListener("click", function(e) {
        currentOperator = e.target.id;
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
        
    });
});

numbers.forEach((number) => {
    number.addEventListener("click", function(e) {
        fillText(e.target.id);
    });
});

let equals = document.querySelector(".equal");
equals.addEventListener('click', function() {
    if (!oldNum || !currentNum) return;
    let result = operate(oldNum, currentNum, currentOperator);
    answerText.textContent = exponential(result);
    currentNum = result.toString();
    oldNum = '';
    currentOperator = '';
    operatorDisplay.textContent = '';
});

let clearFull = document.querySelector("#clear");
clearFull.addEventListener('click', function() {
    currentNum = '';
    oldNum = '';
    answerText.textContent = '0';
    currentOperator = '';
    operatorDisplay.textContent = '';
});

let clear = document.querySelector("#delete");

clear.addEventListener('click', function()
{
    if(currentNum != '0')
    {
        currentNum = currentNum.slice(0, -1);
        answerText.textContent = exponential(currentNum);
        if(currentOperator)
        {
            currentOperator = '';
        }
    }
});

let negation = document.querySelector("#negation");

negation.addEventListener('click', function()
{
    if(currentNum != '0')
    {
        currentNum = currentNum * -1;
        answerText.textContent = exponential(currentNum);
    }
});