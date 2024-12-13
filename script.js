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


let num1, num2, operator;

function operate(num1, num2, operator)
{
    if (operator == "+")
    {
        return add(num1,num2);
    }
    else if (operator == "-")
    {
        return subtract(num1, num2);
    }
    else if (operator == "*")
    {
        return multiply(num1, num2);
    }
    else
    {
        return divide(num1, num2);
    }
}

let numbers = document.querySelectorAll(".number");
let operators = document.querySelector(".operator");
let answerText = document.querySelector(".answer");
let newNum = "";

function fillText(num)
{
    
    newNum += "" + num;
    answerText.textContent = newNum;
}

numbers.forEach((number) => {
    number.addEventListener("click",function(e){
        const clickedElement = e.target.id;
        fillText(clickedElement);
    });
    
});
function isOperatorClicked()
{
    operators.addEventListener('click', function()
        {
            return true;
        }
    );
    return false;
}
