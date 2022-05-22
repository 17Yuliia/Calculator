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

        if (isEmptyValue || this.model.isErrorCurrentValue() || this.model.isAfterResult) {
            return;
        }

        this.model.isAfterResult = true;
        this.compute();
        this.updateView();
    }    

    numberButtonsHandler = (number) =>  {
        if (this.model.isAfterResult) {
            this.model.resetValues();
        }

        this.addNumber(number);
        this.updateView();
    }

    actionButtonsHandler = (action) => {
        switch (action) {
            case 'Escape': {
                this.model.resetValues();;
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
        this.model.isAfterResult = false;
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
        if (this.model.isErrorCurrentValue() || this.model.isAfterResult) {
            this.model.resetValues();
        }

        this.model.removeLastFromCurrentValue();
    }

    changeSign() {
        if (this.model.isErrorCurrentValue() || this.model.isAfterResult) {
            return;
        }

        let signedValue = `${this.model.currentValue * -1}`;

        if (this.model.currentValue in SIGNED_VALUES) {
            signedValue = SIGNED_VALUES[this.model.currentValue];
        }

        this.model.setCurrentValue(signedValue);
    }

    addNumber(number) {
        if (this.model.currentValue.length === INPUT_MAX_SIZE) {
            return;
        }

        if (number === '.' && this.model.currentValue.includes('.')) {
            return;
        }

        const currentValueIsZero = this.model.currentValue === '0' || this.model.currentValue === '-0';

        if (number === '0' && currentValueIsZero) {
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
            default: {
                return;
            }
        }
    }

    updateView() {
        const formatedCurrentValue = new NumberFormat(this.model.currentValue);
        const formatedPreviousValue = new NumberFormat(this.model.previousValue);

        const input = formatedCurrentValue.toOutputFormat();
        const operation = this.getOperationLabel(this.model.operation);
        const history = `${formatedPreviousValue.toOutputFormat()} ${operation}`;

        this.view.setInnerText(this.view.input, input);
        this.view.setInnerText(this.view.history, history);
    }

    getOperationLabel(value) {
        if (!value) {
            return '';
        }

        const button = Object.values(BUTTONS).find((btn) => btn.value === value);

        return button.label;
    }
}