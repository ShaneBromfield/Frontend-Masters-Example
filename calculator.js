let runningTotal = 0;
let buffer = "0"; //The zero on the calculator screen
let previousOperator; //Keeps track of previous computation
const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener("click", function(event){
    buttonClick(event.target.innerText);
});

function buttonClick(value) {             // Differentiates between a symbol(operator) and a value(number)
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender(); //Set's screen to zero when 'C'(clear button) is pressed. 
}                                        

function handleNumber(value) {           //Allows you to put numbers on the screen
    if (buffer === "0") {                // the else section allows you to append numbers
        buffer = value;                  // and place multiple digit numbers on the screen 
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
     case 'C':
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        break;
     case "=":
        if (previousOperator === null) {
            return; //skips the rest of the function
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal; //Concatenation ensures that buffer remains a string. It's bad to switch types.
        runningTotal = 0;
        break;
     case "~": //
        if (buffer.length >= 1) {
            buffer = "0"
        } else {
            buffer - buffer.substring(0, buffer.length - 1);
        }
        break;
     default:
        handleMath(value);
        break;
    }
}

function handleMath(value){
      const intBuffer = parseInt(buffer);
      if (runningTotal === 0) {
          runningTotal = intBuffer; //Assigns runningTotal the value intBuffer
      } else {
          flushOperation(intBuffer);
      }

      previousOperator = value;

      buffer = "0" //Ready for the next number to come in
}

function flushOperation (intBuffer) {
    if(previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "*") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}