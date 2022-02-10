class Calculator {
    
    constructor(){
        this.input = '0';
        this.history = '';
        this.isNewNumber = true;
        this.isAfterResult = false;
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

    ValidateInputNumber() {
        if (this.input === 'Error') {
            return 0;
        }
        const lastSymbol = this.input.slice(-1);
        const number = lastSymbol === '.' ? this.input.slice(0,-1) : this.input;

        return number;
    }

    AddNumber(number) {
        if(this.isAfterResult) {
            this.input = number;
            this.history = '';
            this.isNewNumber = false;
            this.isAfterResult = false;

            return;
        }

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
        if(this.isAfterResult) {
            this.history = '';
            this.isAfterResult = false;
        }

        if(this.isNewNumber) {
            if(this.history === '') {
                this.AppendToHistory('0' + operation);
                return;
            }
            
            this.ReplaceLastInHistory(operation);

            return;
        }
        
        this.isNewNumber = true;
        const number = this.ValidateInputNumber();
        this.input = '0';
        this.AppendToHistory(number + operation);
    }

    AddComma() {
        if(this.input.length > 8) {
            return;
        }

        if(this.isAfterResult) {
            this.isAfterResult = false;
            this.input = '0.';
            this.history = '';
        }

        if(this.isNewNumber) {
            this.isNewNumber = false;
            this.input = '0.';
        }
        else {
            if(!this.input.includes('.')){
                this.AppendToInput('.');
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
        this.AppendToHistory(this.ValidateInputNumber());

        const regFirst = /[÷×%]/;
        const regSecond = /[+\-]/;

        const splitedHistory = this.history.split(/([\+\-\÷\×\%])/);
        const historyArray = splitedHistory.map(n => isNaN(n) ? n : parseFloat(n));

        const firstResult = this.CalculateByPriority(historyArray, regFirst);

        const _if = Array.isArray(firstResult);
        console.log(_if);

        const totalResult = Array.isArray(firstResult) ? this.CalculateByPriority(firstResult, regSecond) : firstResult;

        this.input = totalResult.toString();    
        // this.input = totalResult.toString().slice(0, 9);    
        this.isAfterResult = true;    
    }

    getOperation(sign) {
        switch(sign){
            case('%'): {
                return this.Percent;
            }
            case('×'): {
                return this.Multiply;
            }
            case('÷'): {
                return this.Divide;
            }
            case('-'): {
                return this.Minus;
            }
            case('+'): {
                return this.Plus;
            }
        }
    
        return false;
    }

    CalculateByPriority(array, reg) {    
        const operations = array.join('').match(reg);

        if(!operations) {
            return array;  
        }

        const index = array.indexOf(operations[0]);
        const operation = this.getOperation(operations[0]);
        const val = operation(array[index-1], array[index+1]);

        if(val === 'Error') {
            return val;
        }

        array[index] = val;
        array[index-1] = null;
        array[index+1] = null;
        array = array.filter(n => n !== null);

        if(array.length === 1) {
            return val;
        }

        return this.CalculateByPriority(array, reg);      
    }

    Plus(x, y) {
        return (x * ten + y * ten) / ten;
    }

    Minus(x, y) {
        if(isNaN(x)) {
            x = 0;
        }
        return (x * ten - y * ten) / ten;
    }

    Multiply(x, y) {
        return ((x * ten) * (y * ten)) / (ten * ten);
    }

    Divide(x, y) {
        if(y === 0) {
            return 'Error';
        }

        return ((x * ten) / (y * ten));
    }

    Percent(x, y) {
        return ((x * ten) * (y * ten)) * 0.01 / (ten * ten);
    }
}

const ten = 10000000;