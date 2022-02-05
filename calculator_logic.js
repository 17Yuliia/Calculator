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
    calculator.calculateResult();
}

function ShowOnDisplay() {
    const input = calculator.GetInput();
    const history = calculator.GetHistoty();

    displayInput.textContent = input;
    displayHistory.textContent = history;
}

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
}

init();