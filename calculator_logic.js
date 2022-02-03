document.body.classList.remove('preload');
const display = document.getElementById('display');

let calculator = new Calculator();

function addSymbol(value) {
    console.log('value', value);
    calculator.AddSymbol(value);
    const input = calculator.GetInput();
    ShowOnDisplay(input);
}

function ShowOnDisplay(text) {
    display.textContent = text;
}

function clearDisplay() {
    display.textContent = '';
    calculator.ClearInput();
}

function init() {
    const buttonsCollection = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttonsCollection);

    const cancelButton = buttonsArray.shift();
    cancelButton.onclick = clearDisplay;

    const resultButton = buttonsArray.pop();

    const printedButtons = buttonsArray;
    printedButtons.forEach(btn => {
        const value = btn.textContent;
        btn.onclick = () => {
            return addSymbol(value);
        }
    })

}

init();