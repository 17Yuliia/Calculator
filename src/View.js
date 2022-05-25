class View {
    constructor() {
        this.equal = null;
        this.numbers = [];
        this.actions = [];
        this.memories = [];
        this.operations = [];
    }

    init(currentValue, previousValue, memoryValue) {
        this.initDisplay(currentValue, previousValue, memoryValue);
        this.initButtons();       
    }    

    initDisplay(currentValue, previousValue, memoryValue) {
        this.input = document.getElementById(ELEMENT_IDS.input);
        this.memory = document.getElementById(ELEMENT_IDS.memory);
        this.history = document.getElementById(ELEMENT_IDS.history);

        this.setInnerText(this.input, currentValue);
        this.setInnerText(this.memory, memoryValue);
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
            case OPTIONS.memory: {
                this.memories.push(button);
                break;
            }
            case OPTIONS.copy: {
                this.copy = button;
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

    getFontSize = (textLength) => {
        const baseSize = 50;

        const x = Math.floor((textLength - 1) / 3);
        let fontSize = baseSize - x * 6;

        if (fontSize < 20) {
            fontSize = 20;
        }
        
        return `${fontSize}px`;
    }

    setInnerText(element, value, resetFontSize = false) {
        if (resetFontSize) {
            const fontSize = this.getFontSize(value.length);

            element.style.fontSize = fontSize;
        }
        
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

    addKeydownListener(callback) {
        document.addEventListener('keydown', (event) => {
            callback(event);
        })
    }
}