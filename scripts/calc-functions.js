'using strict';

function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return +num1 - +num2;
}

function multiply(num1, num2) {
  return +num1 * +num2;
}

function divide(num1, num2) {
  return +num1 / +num2;
}

function operate(operator, num1str, num2str) {
  switch (operator) {
    case '+':
      return add(num1str, num2str);
    case '-':
      return subtract(num1str, num2str);
    case '*':
      return multiply(num1str, num2str);
    case '/':
      return divide(num1str, num2str);
    default:
      alert("Error!");
      return undefined;
  }
}

let displayStr = document.getElementById("current-op-str");

function clearDisplay() {
  displayStr.innerText = '';
}

function updateDisplay(event) {
  let value = event.target.innerText;
  if (isNaN(parseFloat(value))) {
    switch (value) {
      case ".":
        displayStr.innerText += value;
        break;
      case "C":
        clearDisplay();
        break;
      case "=":
        break;
      default:
        displayStr.innerText += ` ${value} `;
        break;
    }
    
  }
  else {
    displayStr.innerText += value;
  }
}

let buttons = Array.from(document.querySelectorAll('.numpad-num'));

buttons.forEach((item) => item.addEventListener('click', updateDisplay));
