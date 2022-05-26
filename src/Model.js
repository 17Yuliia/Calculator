class Model {
    constructor() {
        this.resetValues();
        this.resetMemoryValue();
    }

    resetValues() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = '';
        this.isAfterResult = false;
    }

    resetMemoryValue() {
        this.memoryValue = '0';
    }

    checkIsErrorCurrentValue() {
        return this.currentValue === 'ERROR';
    }

    checkIsEmptyCurrentValue() {
        return this.currentValue === '';
    }

    checkIsInfinityCurrentValue() {
        return this.currentValue === 'Infinity' || this.currentValue === '-Infinity';
    }

    checkIsEmptyPreviousValue() {
        return this.previousValue === '';
    }

    removeLastFromCurrentValue() {
        this.currentValue = this.currentValue.slice(0, -1);
    }

    removeFirstFromCurrentValue() {
        this.currentValue = this.currentValue.slice(1);
    }

    setCurrentValue(value) {
        this.currentValue = value;
    }

    setPreviousValue(value) {
        this.previousValue = value;
    }

    setMemoryValue(value) {
        if (isNaN(value)) {
            return;
        }

        this.memoryValue = value || '0';
    }
}