document.body.classList.remove('preload');
const display = document.getElementById('display');
const displayText = Array.from(document.getElementsByClassName('display-block__text'))[0];
console.log(displayText);

let calculator = new Calculator();

function addSymbol(value) {
    calculator.ValidateInput(value);
    const input = calculator.GetInput();
    ShowOnDisplay(input);
    displayText.scrollTop = displayText.scrollHeight;
}

function ShowOnDisplay(text) {
    display.textContent = text;
}

function clearDisplay() {
    display.textContent = '0';
    calculator.ClearInput();
}

function calculateResult() {
    calculator.calculateResult();
}

function init() {
    const buttonsCollection = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttonsCollection);

    const cancelButton = buttonsArray.shift();
    cancelButton.onclick = clearDisplay;

    const resultButton = buttonsArray.pop();
    resultButton.onclick = calculateResult;

    const printedButtons = buttonsArray;
    printedButtons.forEach(btn => {
        const value = btn.textContent;
        btn.onclick = () => {
            return addSymbol(value);
        }
    })

}

init();