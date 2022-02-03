class Calculator {
    constructor(){
        this.input = '';
    };

    AddSymbol(symbol) {
        this.input = this.input + symbol;
    }

    GetInput() {
        return this.input;
    }

    ClearInput() {
        this.input = '';
    }
    
    Plus(x, y) {
        return x + y;
    }

    Minus(x, y) {
        return x - y;
    }

    Multiply(x, y) {
        return x * y;
    }

    Divide(x, y) {
        return x / y;
    }

    CalcResult() {

    }
}