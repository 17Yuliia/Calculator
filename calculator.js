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
        const lastSymbol = this.input.slice(-1);
        const number = lastSymbol === '.' ? this.input.slice(0,-1) : this.input;

        return number;
    }

    AddNumber(number) {
        if(this.isAfterResult) {
            this.input = number;
            this.history = '';
            this.isAfterResult = false;

            return;
        }

        if(this.isNewNumber || this.isAfterResult) {
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

        const splitedHistory = this.history.split(/([\+\-\÷\×\%])/);
        const historyArray = splitedHistory.map(n => isNaN(n) ? n : parseFloat(n));
        
        const firstPriorityResult = this.CalculateFirstPriority(historyArray);

        const totalResult = this.CalculateSecondPriority(firstPriorityResult)[0];

        this.input = totalResult.toString();    
        this.isAfterResult = true;    
    }

    CalculateFirstPriority(array) {
        array.forEach((i, index) => {
            let operation = false;
            
            switch(i){
                case('%'): {
                    operation = this.Percent;
                    break;
                }
                case('×'): {
                    operation = this.Multiply;
                    break;
                }
                case('÷'):{
                    operation = this.Divide;
                    break;
                }
            }

            if(operation) {
                array[index] = operation(array[index-1], array[index+1]);
                delete array[index-1];
                delete array[index+1];
                array = array.filter(n => n);

                if(array.length === 1) {
                    return array[0];
                }
                array = this.CalculateFirstPriority(array);
            }   
        }) 
        
        return array;        
    }

    CalculateSecondPriority(array) {
        array.forEach((i, index) => {
            let operation = false;
            
            switch(i){
                case('+'): {
                    operation = this.Plus;
                    break;
                }
                case('-'): {
                    operation = this.Minus;
                    break;
                }
            }

            if(operation) {
                array[index] = operation(array[index-1], array[index+1]);
                delete array[index-1];
                delete array[index+1];
                array = array.filter(n => n);

                if(array.length === 1) {
                    return array[0];
                }
                array = this.CalculateSecondPriority(array);
            }   
        })  

        return array;        
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

    Percent(x, y) {
        return x * y * 0.01;
    }
}