'using strict';

const ALLOWEDINPUTS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                       '+', '-', '*', '/', '=', '←', '.', 'C']

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
  decimalInUse = false;
  operatorInput = false;
  lastWasOperator = false;
}

/**
 * Update the display using the approrpiate button target.
 * @param {Event} event 
 */

function updateDisplay(event) {
  let value = event.target.innerText;
  console.log(value);
  if (displayStr.innerText.length > 31 && !(value === "←" || value === "C")) {
    alert("Not enough room in the calculator. Please try a shorter operation.");
    return;
  }
  if (isNaN(parseFloat(value))) {
    switch (value) {
      case ".":
        if (!decimalInUse) {
          if (lastWasOperator || displayStr.innerText === "") {
            displayStr.innerText += " 0" + value;
            lastWasOperator = false;
          }
          else {
            displayStr.innerText += value;
          }
          decimalInUse = true;
        }
        break;
      case "C":
        clearDisplay();
        lastWasOperator = false;
        break;
      case "←": // Erase
        displayStr.innerText = displayStr.innerText.trimEnd().slice(0, -1);
        if (lastWasOperator) {
          lastWasOperator = false;
        }
        break;
      case "=":
        if (!lastWasOperator) {
          evalEquals();
        }
        break;
      default:
        if (!lastWasOperator) {
          // Reset the decimal for the other number.
          decimalInUse = false;
          lastWasOperator = true;
          if (operatorInput) {
            displayStr.innerText += " " + value;
            evalEquals();
          }
          else {
            displayStr.innerText += "0 " + value;
            operatorInput = true;
          }
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

  if (displayStr.innerText.length > 12) {
    displayStr.style.fontSize = "18px";
  }
  else {
    displayStr.style.fontSize = "25px";
  }
}

/**
 * Run the binary operation displayed on the calculator.
 */
function evalEquals() {
  // Run Calculations
  let valueArray = displayStr.innerText.split(' ');
  
  if (valueArray.length < 3) {
    return; // Do nothing
  }

  if (valueArray[1] === '/' && +valueArray[2] === 0) {
    alert("Dividing by 0 is not well defined. If we defined it, then we would run into inconsistencies in arithmetic. This would be VERY BAD. Consider yourself warned.");
    displayStr.innerText = displayStr.innerText.slice(0, valueArray[0].length + 1);
    return;
  }

  let newValue = operate(valueArray[1], valueArray[0], valueArray[2]).toFixed(9);
  let strValue = (newValue < 0 ? '-' : '') + String(Math.abs(newValue));

  // Remove the numbers and operators associated with the last operation.
  displayStr.innerText = displayStr.innerText.replace(' ' + valueArray[1]+ ' ', '');
  displayStr.innerText = displayStr.innerText.replace(valueArray[0], strValue);
  displayStr.innerText = displayStr.innerText.replace(valueArray[2], '');

}

/**
 * Process the key presses to work with the rest of the code.
 * @param {Event} event The keypress event.
 */
function processKeyPress(event) {
  let pressedKey = {target : {innerText : `${event.key}`}}
  // Also let enter evaluate the expression.
  if (event.key === 'Enter') {
    pressedKey.target.innerText = '=';
  }
  else if (event.key === "Delete") {
    pressedKey.target.innerText = '←';
  }
  else if (event.key.toUpperCase() === "C") {
    clearDisplay();
  }
  if (ALLOWEDINPUTS.includes(pressedKey.target.innerText)) {
    updateDisplay(pressedKey);
  }

}

let buttons = Array.from(document.querySelectorAll('.numpad-num'));

buttons.forEach((item) => item.addEventListener('click', updateDisplay));

let decimalInUse = false;
let lastWasOperator = false;
let operatorInput = false;

document.addEventListener('keypress', processKeyPress);

