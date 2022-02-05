class Calculator {
    constructor(){
        this.input = '0';
        this.history = '';
        this.isNewNumber = true;
    };

    AppendToInput(symbol) {
        this.input += symbol;
    }

    AppendToHistory(number) {
        this.history += number;
    }

    ReplaceLastInHistory(symbol) {
        this.history = this.history.slice(0,-1) + symbol;
    }

    RemoveLastFromInput() {
        this.input = this.input.slice(0, -1);
    }

    // getInputNumbers(symbol) {
    //     const spliters = /[+\-%×÷]/g
    //     const numbersArray = (this.input + symbol).split(spliters);
        
    //     return numbersArray;
    // }

    AddNumber(number) {
        if(this.isNewNumber) {
            this.input = number;
            this.isNewNumber = false;

            return;
        }

        if(this.input.length > 8) {
            return;
        }
        
        this.input !== '0' && this.AppendToInput(number);
    }

    AddOperation(operation) {
        if(this.isNewNumber) {
            if(this.history === '') {
                this.AppendToHistory('0' + operation);
                return;
            }
            
            this.ReplaceLastInHistory(operation);

            return;
        }
        
        this.isNewNumber = true;
        const lastSymbol = this.input.slice(-1);
        const newNumber = lastSymbol === ',' ? this.input.slice(0,-1) : this.input;
        this.AppendToHistory(newNumber + operation);
    }

    AddComma() {
        if(this.isNewNumber) {
            this.isNewNumber = false;
            this.input = '0,';
        }
        else {
            if(!this.input.includes(',')){
                this.AppendToInput(',');
            }
        }
    }

    DeleteLastSymbol() {
        if(this.input.length > 1) {
            this.RemoveLastFromInput();

            if(this.input === '0') {
                this.isNewNumber = true;
            }

            return;
        }            

        this.input = '0';
        this.isNewNumber = true;
    }

    GetInput() {
        return this.input;
    }

    GetHistoty() {
        return this.history;
    }

    ClearDisplay() {
        this.input = '0';
        this.history = '';
        this.isNewNumber = true;
    }

    CalcResult() {

    }
}