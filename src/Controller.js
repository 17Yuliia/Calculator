class Controller { 
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.calculator = new Calculator();
    }
  
    init() {
        this.view.init(this.model.currentValue, this.model.previousValue);

        this.addListeners();
    }

    addListeners() {
        this.view.addKeydownListener(this.documentKeydownHandler);

        this.view.addListenerForElement(this.view.equal, this.equalButtonHandler);

        this.view.addListenerForElements(this.view.actions, this.actionButtonsHandler)
        this.view.addListenerForElements(this.view.numbers, this.numberButtonsHandler);
        this.view.addListenerForElements(this.view.operations, this.operationButtonsHandler);
    }

    equalButtonHandler = () => {
        const isEmptyValue = this.model.isEmptyPreviousValue() || this.model.isEmptyCurrentValue();

        if (isEmptyValue || this.model.isErrorCurrentValue()) {
            return;
        }

        this.compute();
        this.updateView();
    }    

    numberButtonsHandler = (number) =>  {
        this.addNumber(number);
        this.updateView();
    }

    actionButtonsHandler = (action) => {
        switch (action) {
            case 'Escape': {
                this.clearAll();
                break;
            }
            case 'Backspace': {
                this.deleteLast();
                break;
            }
            case 'Sign': {
                this.changeSign();
                break;
            }
            default: {
                return;
            }
        }

        this.updateView();
    }

    operationButtonsHandler = (operation) => {
        this.chooseOperation(operation);
        this.updateView();
    }

    documentKeydownHandler = (key) => {
        const button = Object.values(BUTTONS).find((btn) => btn.value === key);

        if (!button) {
            return;
        }

        const keyOption = button.option;

        switch(keyOption) {
            case OPTIONS.equal: {
                this.equalButtonHandler();
                break;
            }
            case OPTIONS.number: {
                this.numberButtonsHandler(key);
                break;
            }
            case OPTIONS.action: {
                this.actionButtonsHandler(key);
                break;
            }
            case OPTIONS.operation: {
                this.operationButtonsHandler(key);
                break;
            }
            default: {
                return;
            }
        }
    }

    deleteLast() {
        if (this.model.isErrorCurrentValue()) {
            this.clearAll();
        }

        this.model.removeLastFromCurrentValue();
    }

    changeSign() {
        if (this.model.isEmptyCurrentValue() || this.model.isErrorCurrentValue() || this.model.currentValue === '0') {
            return;
        }

        this.model.currentValue *= -1;
    }

    addNumber(number) {
        if (number === '.' && this.model.currentValue.includes('.')) {
            return;
        }

        if (number === '0' && this.model.currentValue === '0') {
            return;
        }

        if ((this.model.currentValue === '0' && number !== '.') || this.model.isErrorCurrentValue()) {
            this.model.setCurrentValue('');
        }

        const value = `${this.model.currentValue}${number}`;
        this.model.setCurrentValue(value);
    }

    chooseOperation(operation) {
        const isEmptyValues = this.model.isEmptyPreviousValue() && this.model.isEmptyCurrentValue();

        if (this.model.isErrorCurrentValue() || isEmptyValues) {
            return;
        }

        if (this.model.isEmptyCurrentValue()) {
            this.model.operation = operation;
            return;
        }

        if (!this.model.isEmptyPreviousValue() && !this.model.isEmptyCurrentValue()) {
            this.compute();
        }        

        this.model.operation = operation;
        this.model.setPreviousValue(this.model.currentValue);
        this.model.setCurrentValue('');
    }

    compute() {
        const current = +this.model.currentValue;
        const previous = +this.model.previousValue;

        this.calculator.setX(previous);
        this.calculator.setY(current);

        const result = this.makeOperation();

        this.model.setCurrentValue(result.toString());
        this.model.setInitialPreviousValue();
        this.model.operation = '';
    }

    makeOperation() {
        switch (this.model.operation) {
            case OPERATIONS.plus: {
                return this.calculator.sum();
            }
            case OPERATIONS.minus: {
                return this.calculator.sub();
            }
            case OPERATIONS.multiply: {
                return this.calculator.mul();
            }
            case OPERATIONS.divide: {
                return this.calculator.div();
            }
            default:
                return;
        }
    }

    updateView() {
        const input = this.model.currentValue;
        const operation = this.getOperationLabel(this.model.operation);
        const history = `${this.model.previousValue} ${operation}`;
        
        this.view.setInnerText(this.view.input, input);
        this.view.setInnerText(this.view.history, history);
    }

    clearAll() {
        this.model.setInitialCurrentValue();
        this.model.setInitialPreviousValue();
        this.model.operation = '';
    }

    getOperationLabel(value) {
        if (!value) {
            return '';
        }

        const button = Object.values(BUTTONS).find((btn) => btn.value === value);

        return button.label;
    }
}