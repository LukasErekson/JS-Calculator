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

/**
 * Takes in the operating parameters and actualyl runs the desired
 * binary operation.
 * @param {String} operator The operator to use with the two numbers.
 * @param {String} num1str The first (left) number in the operation.
 * @param {String} num2str The second (right) number in the operation.
 * @returns 
 */
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

/**
 * Reset the display so that it's empty.
 */
function clearDisplay() {
  displayStr.innerText = '';
}

/**
 * Update the display using the approrpiate button target.
 * @param {Event} event 
 */

function updateDisplay(event) {
  let value = event.target.innerText;
  if (isNaN(parseFloat(value))) {
    switch (value) {
      case ".":
        if (!decimalInUse) {
          displayStr.innerText += value;
          decimalInUse = true;
        }
        break;
      case "C":
        clearDisplay();
        lastWasOperator = false;
        break;
      case "=":
        console.log(lastWasOperator);
        if (!lastWasOperator) {
          // Run Calculations
          let valueArray = displayStr.innerText.split(' ');
          if (valueArray.length < 3) {
            break;
          }
          let newValue = operate(valueArray[1], valueArray[0], valueArray[2]);
          let strValue = (newValue < 0 ? '-' : '') + String(Math.abs(newValue));
          console.log(newValue);
          console.log(strValue);
          // TODO : Still a bit buggy.
          // Remove the numbers and operators associated with the last operation.
          displayStr.innerText = displayStr.innerText.replace(valueArray[1], '');
          displayStr.innerText = displayStr.innerText.replace(valueArray[0], strValue);
          displayStr.innerText = displayStr.innerText.replace(valueArray[2], '');
        }
        break;
      default:
        if (!lastWasOperator) {
          displayStr.innerText += " " + value;
          // Reset the decimal for the other number.
          decimalInUse = false;
          lastWasOperator = true;
        }
        break;
    }
    
  }
  else {
    if (lastWasOperator) {
      displayStr.innerText += " " + value;
    }
    else {
      displayStr.innerText += value;
    }
    lastWasOperator = false;
  }
}

/**
 * Finds the first operator in the string to assign as the operator.
 * @returns {String or Number} The operator if one is found, otherwise returns -1.
 */
function findOperator() {
  let displayText = displayStr.innerText;
  for (let i = 0; i <= displayText.length; i++) {
    if (displayText[i] !== '.' && isNaN(parseFloat(displayText[i]))) {
      return displayText[i];
    }
    return -1;
  }
}

let buttons = Array.from(document.querySelectorAll('.numpad-num'));

buttons.forEach((item) => item.addEventListener('click', updateDisplay));

let decimalInUse = false;
let lastWasOperator = false;

