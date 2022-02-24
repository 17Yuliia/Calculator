const displayInput = document.getElementById('input');
const displayHistory = document.getElementById('history');

const calculator = new Calculator();

// functions for handling different clicks
function addNumber(value) {
    calculator.AddNumber(value);
    ShowOnDisplay();
}

function addComma() {
    calculator.AddComma();
    ShowOnDisplay();
}

function addOperation(value) {
    calculator.AddOperation(value);
    displayHistory.scrollTop = displayHistory.scrollHeight;
    ShowOnDisplay();
}

function clearDisplay() {
    calculator.ClearDisplay();
    ShowOnDisplay();
}

function deleteLastSymbol() {
    calculator.DeleteLastSymbol();
    ShowOnDisplay();
}

function calculateResult() {
    const result = calculator.CalcResult();
    const uiResult = validateResult(result);
    ShowOnDisplay(uiResult);
}

function validateResult(result) {
    if(isNaN(result)) {
        return result;
    }

    return roundResult(Number(result));
}

function roundResult(value) {
    // too big or too small number
    if(Math.abs(value) > 999999999 || Math.abs(value) < 0.0000001) {
        const expValue = value.toExponential(3).toString();
        return expValue;
    }

    //float number must be rounded if it has more then 9 symbols
    const strValue = value.toString();
    const idx = strValue.indexOf('.');
    
    if(idx > 0 && idx <= 9) {
        const pow = Math.pow(10, 9 - idx);
        const roundedResult = Math.round(value * pow) / pow;
        return roundedResult;
    }

    return value;
}

function ShowOnDisplay(input = calculator.GetInput()) {
    const history = calculator.GetHistoty();

    displayInput.textContent = input;
    displayHistory.textContent = history.join('');
}

// keyboard

function hadleKeyDown(key) {
    const input = validateKey(key);

    if(input >= 0 && input <= 9) {
        addNumber(input);
    }

    if(input === '+' || input === '-' || input === '%' || input === '÷' || input === '×') {
        addOperation(input);
    }

    if(input === '.' || input === ',') {
        addComma();
    }

    if(input === 'Backspace') {
        deleteLastSymbol();
    }

    if(input === 'Enter') {
        calculateResult();
    }

    if(input === 'Escape') {
        clearDisplay();
    }
}

function validateKey(key) {
    switch(key) {
        case '*': {
            return '×';
        }
        case '/':{
            return '÷';
        }
        default: {
            return key;
        }
    }    
}

// for init

function getElementsByOption(optionValue) {
    const elements = Array.from(document.querySelectorAll(`[option=${optionValue}]`));
    return elements;
}

function init() {
    document.body.classList.remove('preload');
    // ctrl-z TO DO

    // cancel btn
    const cancelButton = getElementsByOption('cancel')[0];
    cancelButton.onclick = clearDisplay;

    // ,
    const comaButton =  getElementsByOption('coma')[0];
    comaButton.onclick = addComma;

    // =
    const resultButton =  getElementsByOption('result')[0];
    resultButton.onclick = calculateResult;

    // <=
    const backspaceButton = getElementsByOption('backspace')[0];
    backspaceButton.onclick = deleteLastSymbol;

    // numbers
    const numberButtons = getElementsByOption('number');
    numberButtons.forEach(btn => {
        const value = btn.textContent;
        btn.onclick = () => {
            return addNumber(value);
        }
    })

    //operators
    const operatorButtons = getElementsByOption('operator');
    operatorButtons.forEach(btn => {
        const value = btn.textContent;
        btn.onclick = () => {
            return addOperation(value);
        }
    })

    document.onkeydown = (event) => {
        event.repeat = false;
        return hadleKeyDown(event.key);
    }
}

init();