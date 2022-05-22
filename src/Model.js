class Model {
    constructor() {
        this.resetValues();
    }

    resetValues() {
        this.setInitialCurrentValue();
        this.setInitialPreviousValue();
        this.operation = '';
        this.isAfterResult = false;
    }

    setInitialCurrentValue() {
        this.currentValue = '0';
    }

    setInitialPreviousValue() {
        this.previousValue = '';
    }

    isEmptyCurrentValue() {
        return this.currentValue === '';
    }

    isErrorCurrentValue() {
        return this.currentValue === 'ERROR';
    }

    isEmptyPreviousValue() {
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