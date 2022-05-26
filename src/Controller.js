class Controller { 
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.calculator = new Calculator();
    }
  
    init() {
        this.view.init();

        this.updateView();
        this.addListeners();
    }

    addListeners() {
        this.view.addKeydownListener(this.documentKeydownHandler);

        this.view.addListenerForElement(this.view.copy, this.copyButtonHandler);
        this.view.addListenerForElement(this.view.equal, this.equalButtonHandler);

        this.view.addListenerForElements(this.view.actions, this.actionButtonsHandler)
        this.view.addListenerForElements(this.view.numbers, this.numberButtonsHandler);
        this.view.addListenerForElements(this.view.memories, this.memoryButtonHandler);
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

        const length = NumberFormat.getNumberCount(this.model.currentValue);

        if (length >= INPUT_MAX_SIZE) {
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

    memoryButtonHandler = (action) => {
        switch (action) {
            case MEMORY_ACTIONS.mRead: {
                this.model.setCurrentValue(this.model.memoryValue);
                this.updateView();
                break;
            }
            case MEMORY_ACTIONS.mSave: {
                this.model.setMemoryValue(this.model.currentValue);
                break;
            }
            case MEMORY_ACTIONS.mClear: {
                this.model.resetMemoryValue();
                break;
            }
            case MEMORY_ACTIONS.mPlus: {
                this.sumToMemory();
                break;
            }
            case MEMORY_ACTIONS.mMinus: {
                this.subFromMemory();
                break;
            }
            default: {
                return;
            }
        }

        this.updateMemory();
    }

    operationButtonsHandler = (operation) => {
        this.model.isAfterResult = false;
        this.chooseOperation(operation);
        this.updateView();
    }

    copyButtonHandler = () => {
        navigator.clipboard.writeText(this.model.currentValue);
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
        if (this.checkResetIsNeeded() && isNaN(this.model.currentValue)) {
            this.model.resetValues();
        }

        if (this.model.checkIsEmptyCurrentValue()) {
            this.model.setCurrentValue('0');
        }

        if (this.model.currentValue.includes('-')) {
            this.model.removeFirstFromCurrentValue();
            return;
        } 
        
        this.model.setCurrentValue(`-${this.model.currentValue}`);
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

    sumToMemory() {
        if (this.model.checkIsErrorCurrentValue()) {
            return;
        }

        this.setCalculatorValues(this.model.memoryValue, this.model.currentValue);
        const result = this.calculator.sum();
        this.model.setMemoryValue(result.toString());
    }

    subFromMemory() {
        if (this.model.checkIsErrorCurrentValue()) {
            return;
        }
        
        this.setCalculatorValues(this.model.memoryValue, this.model.currentValue);
        const result = this.calculator.sub();
        this.model.setMemoryValue(result.toString());
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
        this.setCalculatorValues(this.model.previousValue, this.model.currentValue);

        const result = this.makeOperation();

        this.model.setCurrentValue(result.toString());
        this.model.setPreviousValue('');
        this.model.operation = '';
    }

    setCalculatorValues(x, y) {
        this.calculator.setX(+x);
        this.calculator.setY(+y);
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
        this.updateInput();
        this.updateHistory();
        this.updateOperation();
        this.updateMemory();
    }

    updateInput() {
        const formatedCurrentValue = this.getFormatedNumber(this.model.currentValue);

        this.view.setInnerText(this.view.input, formatedCurrentValue, true);
    }

    updateHistory() {
        const formatedHistory = this.getFormatedNumber(this.model.previousValue);

        this.view.setInnerText(this.view.history, formatedHistory);
    }

    updateOperation() {
        const operation = this.getOperationLabel(this.model.operation);

        this.view.setInnerText(this.view.operation, operation);
    }

    updateMemory() {
        const formatedMemoryValue = this.getFormatedNumber(this.model.memoryValue);

        this.view.setInnerText(this.view.memory, formatedMemoryValue);
    }

    getFormatedNumber(number) {
        const numberEntity = new NumberFormat(number);

        return numberEntity.toOutputFormat();
    }

    getOperationLabel(value) {
        if (!value) {
            return '';
        }

        const button = Object.values(BUTTONS).find((btn) => btn.value === value);

        return button.label;
    }
}