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
        const isNotCountable = this.checkIsAnyEmpty() || this.model.checkIsErrorCurrentValue();
        
        if (isNotCountable) {
            return;
        }

        this.compute();
        this.updateView();
        this.model.isAfterResult = true;
    }    

    numberButtonsHandler = (number) =>  {
        if (this.checkResetIsNeeded()) {
            this.model.resetValues();
        }

        if (this.model.currentValue.length >= INPUT_MAX_SIZE) {
            return;
        }

        this.addNumber(number);
        this.updateView();
    }

    actionButtonsHandler = (action) => {
        switch (action) {
            case OPTION_CODES.escape: {
                this.model.resetValues();;
                break;
            }
            case OPTION_CODES.backspace: {
                this.deleteLast();
                break;
            }
            case OPTION_CODES.sign: {
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

    documentKeydownHandler = (event) => {
        const key = event.key;
        const button = Object.values(BUTTONS).find((btn) => btn.value === key);

        if (!button) {
            return;
        }

        event.preventDefault();

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

    checkResetIsNeeded() {
        return this.model.isAfterResult 
        || this.model.checkIsErrorCurrentValue() 
        || this.model.checkIsInfinityCurrentValue();
    }

    checkIsAnyEmpty() {
        const isEmptyCurrent = this.model.checkIsEmptyCurrentValue();
        const isEmptyPrevious = this.model.checkIsEmptyPreviousValue();
        const isAnyEmpty = isEmptyCurrent || isEmptyPrevious;

        return isAnyEmpty;
    }

    deleteLast() {
        if (this.checkResetIsNeeded()) {
            this.model.resetValues();
        }

        if (this.model.currentValue.includes('-') && this.model.currentValue.length === 2) {
            this.model.setCurrentValue('');
        }

        this.model.removeLastFromCurrentValue();
    }

    changeSign() {
        if (this.checkResetIsNeeded()) {
            this.model.resetValues();
        }

        let signedValue = `${this.model.currentValue * -1}`;

        if (this.model.currentValue in SIGNED_VALUES) {
            signedValue = SIGNED_VALUES[this.model.currentValue];
        }

        this.model.setCurrentValue(signedValue);
    }

    addNumber(number) {
        if (number === '.' && this.model.currentValue.includes('.')) {
            return;
        }
        
        if (number === '.' && this.model.checkIsEmptyCurrentValue()) {
            this.model.currentValue = `${this.model.currentValue}0`;
        }

        const currentValueIsZero = this.model.currentValue === '0' || this.model.currentValue === '-0';

        if (number === '0' && currentValueIsZero) {
            return;
        }

        if (currentValueIsZero && number !== '.') {
            this.model.removeLastFromCurrentValue();
        }

        const value = `${this.model.currentValue}${number}`; 
        this.model.setCurrentValue(value);
    }

    chooseOperation(operation) {
        const isEmptyCurrent = this.model.checkIsEmptyCurrentValue();
        const isEmptyPrevious = this.model.checkIsEmptyPreviousValue();
        const isEmptyBoth = isEmptyCurrent && isEmptyPrevious;

        if (isEmptyBoth || this.model.checkIsErrorCurrentValue()) {
            return;
        }

        if (isEmptyCurrent) {
            this.model.operation = operation;
            return;
        }

        if (!isEmptyCurrent && !isEmptyPrevious) {
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
        this.model.setPreviousValue('');
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

        this.view.setInnerText(this.view.input, input, true);
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