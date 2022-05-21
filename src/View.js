class View {
    constructor() {
        this.equal = null;
        this.numbers = [];
        this.actions = [];
        this.operations = [];
    }

    init(currentValue, previousValue) {
        this.initDisplay(currentValue, previousValue);
        this.initButtons();       
    }    

    initDisplay(currentValue, previousValue) {
        this.input = document.getElementById(ELEMENT_IDS.input);
        this.history = document.getElementById(ELEMENT_IDS.history);

        this.setInnerText(this.input, currentValue);
        this.setInnerText(this.history, previousValue);
    }

    initButtons() {
        const keyboard = document.getElementById(ELEMENT_IDS.keyboard);

        BUTTONS_SEQUANCE.forEach((key) => {
            const data = BUTTONS[key];
            const button = this.createButton(data);
            
            keyboard.append(button);

            this.groupButtonByOption(button, data.option);
        })
    }

    createButton(data) {
        const {
            name,
            label,
            option,
            className,
        } = data;

        const button = document.createElement('button');

        button.innerText = label;
        button.setAttribute('name', name);
        button.setAttribute('option', option);
        button.setAttribute('class', className);

        return button;
    }

    groupButtonByOption(button, option) {
        switch(option) {
            case OPTIONS.equal: {
                this.equal = button;
                break;
            }
            case OPTIONS.number: {
                this.numbers.push(button);
                break;
            }
            case OPTIONS.action: {
                this.actions.push(button);
                break;
            }
            case OPTIONS.operation: {
                this.operations.push(button);
                break;
            }
            default: {
                return;
            }
        }
    }

    setInnerText(element, value) {
        element.innerText = value;
    }

    getInnerText(element) {
        return element.innerText;
    }

    addListenerForElement(element, callback) {
        element.addEventListener('click', () => callback(BUTTONS[element.name].value));
    }

    addListenerForElements(elements, callback) {
        elements.forEach((element) => {
            this.addListenerForElement(element, callback);
        })
    }

    addKeypressListener(callback) {
        document.addEventListener('keydown', (event) => {
            callback(event.key);
        })
    }
}