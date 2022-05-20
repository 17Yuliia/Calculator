class Model {
    constructor() {
        this.setInitialCurrentValue();
        this.setInitialPreviousValue();
        this.operation = '';
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