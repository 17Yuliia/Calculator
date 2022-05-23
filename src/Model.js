class Model {
    constructor() {
        this.resetValues();
    }

    resetValues() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = '';
        this.isAfterResult = false;
    }

    checkIsErrorCurrentValue() {
        return this.currentValue === 'ERROR';
    }

    checkIsEmptyCurrentValue() {
        return this.currentValue === '';
    }

    checkIsEmptyPreviousValue() {
        return this.previousValue === '';
    }

    removeLastFromCurrentValue() {
        this.currentValue = this.currentValue.slice(0, -1);
    }

    setCurrentValue(value) {
        this.currentValue = value;
    }

    setPreviousValue(value) {
        this.previousValue = value;
    }
}