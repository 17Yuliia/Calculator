const INPUT_ID = 'input';
const HISTORY_ID = 'history';
const ACTION_OPTIONS = [
    'cancel',
    'backspace',
    'sign',
    'equal',
];

class View {
    init(currentValue, previousValue) {
        this.input = document.getElementById(INPUT_ID);
        this.history = document.getElementById(HISTORY_ID);

        this.setInnerText(this.input, currentValue);
        this.setInnerText(this.history, previousValue);

        ACTION_OPTIONS.forEach((option) => {
            this[option] = document.querySelector(`[option=${option}]`);
        })

        this.numbers = document.querySelectorAll(`[option=number]`);
        this.operations = document.querySelectorAll(`[option=operator]`);
    }

    setInnerText(element, value) {
        element.innerText = value;
    }

    getInnerText(element) {
        return element.innerText;
    }

    addListenerForElement(element, callback) {
        element.addEventListener('click', () => callback(element));
    }

    addListenerForElements(elements, callback) {
        elements.forEach((element) => {
            this.addListenerForElement(element, callback);
        })
    }
}