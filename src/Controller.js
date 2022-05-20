class Controller { 
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.calculator = new Calculator();
    }
  
    init() {
        this.view.init(this.model.currentValue, this.model.previousValue);

        this.view.addListenerForElement(this.view.sign, this.signButtonHandler);
        this.view.addListenerForElement(this.view.equal, this.equalButtonHandler);
        this.view.addListenerForElement(this.view.cancel, this.cancelButtonHandler);
        this.view.addListenerForElement(this.view.backspace, this.backspaceButtonHandler);

        this.view.addListenerForElements(this.view.numbers, this.numberButtonsHandler);
        this.view.addListenerForElements(this.view.operations, this.operationButtonsHandler);
    }

    signButtonHandler = () => {
        if (this.model.isEmptyCurrentValue() || this.model.isErrorCurrentValue() || this.model.currentValue === '0') {
            return;
        }

        this.model.currentValue *= -1;
        this.updateView();
    }

    equalButtonHandler = () => {
        const isEmptyValue = this.model.isEmptyPreviousValue() || this.model.isEmptyCurrentValue();

        if (isEmptyValue || this.model.isErrorCurrentValue()) {
            return;
        }

        this.compute();
        this.updateView();
    }

    cancelButtonHandler = () => {
        this.clearAll();
        this.updateView();
    }

    backspaceButtonHandler = () => {
        if (this.model.isErrorCurrentValue()) {
            this.clearAll();
        }

        this.model.removeLastFromCurrentValue();
        this.updateView();
    }

    numberButtonsHandler = (element) =>  {
        const number = this.view.getInnerText(element);

        this.addNumber(number);
        this.updateView();
    }

    operationButtonsHandler = (element) => {
        const operation = this.view.getInnerText(element);

        this.chooseOperation(operation);
        this.updateView();
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
            case '+': {
                return this.calculator.sum();
            }
            case '−': {
                return this.calculator.sub();
            }
            case '×': {
                return this.calculator.mul();
            }
            case '÷': {
                return this.calculator.div();
            }
            default:
                return;
        }
    }

    updateView() {
        const input = this.model.currentValue;
        const history = `${this.model.previousValue} ${this.model.operation}`;
        
        this.view.setInnerText(this.view.input, input);
        this.view.setInnerText(this.view.history, history);
    }

    clearAll() {
        this.model.setInitialCurrentValue();
        this.model.setInitialPreviousValue();
        this.model.operation = '';
    }
}