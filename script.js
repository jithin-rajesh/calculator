function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}



window.addEventListener('load', adjustFontSize);
let num1, num2, operator;
let answer;
function operate(num1, num2, operator)
{
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (operator == "+")
    {
        answer =  add(num1,num2);
    }
    else if (operator == "-")
    {
        answer = subtract(num1, num2);
    }
    else if (operator == "*")
    {
        answer = multiply(num1, num2);
    }
    else
    {
        if(num2 == 0)
        {
            answer = "Really Dude?"
        }
        else {
            answer = divide(num1, num2).toFixed(8);
        }
    }
    return answer;
}

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let answerText = document.querySelector(".answer");
let operatorDisplay = document.querySelector(".display");

let currentNum = "";
let oldNum = "";

function fillText(num)
{
    currentNum += "" + num;
    answerText.textContent = currentNum;
    updateFontSize();
}

let isOperatorClicked = "false";
let currentOperator = "";
operators.forEach((operator) =>
    {
        operator.addEventListener("click", function(e)
        {
            const clickedElement = e.target.id;
            isOperatorClicked = true;
            console.log(clickedElement);
            currentOperator = clickedElement;
            operatorDisplay.textContent = clickedElement;
        });
    });


numbers.forEach((number) => {
    number.addEventListener("click",function(e){
        const clickedElement = e.target.id;
        if(isOperatorClicked == true){
            oldNum = currentNum;
            currentNum = "";
            isOperatorClicked = false;
        }
        fillText(clickedElement);
    });
    
});

let equals = document.querySelector(".equal");


equals.addEventListener('click',function()
{
    let result = operate(oldNum, currentNum, currentOperator);
    answerText.textContent = result;
    currentNum = result.toString();
    oldNum = '';
    isOperatorClicked = false;
});

let clearFull = document.querySelector("#clear");
clearFull.addEventListener('click', function()
{
    currentNum = '';
    oldNum = '';
    answerText.textContent = '0';
});


