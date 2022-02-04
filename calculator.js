class Calculator {
    constructor(){
        this.input = '0';
    };

    Append(symbol) {
        this.input += symbol;
    }

    ReplaceLast(symbol) {
        this.input = this.input.slice(0,-1) + symbol;
    }

    getInputNumbers(symbol) {
        const spliters = /[+\-%×÷]/g
        const numbersArray = (this.input + symbol).split(spliters);
        
        return numbersArray;
    }

    ValidateInput(symbol) {
        const isNaNSymbol = isNaN(symbol);

        if(this.input == '0') {
            isNaNSymbol ? this.Append(symbol) : this.ReplaceLast(symbol);
        }
        else {
            const lastSymbol = this.input.slice(-1);
            const isNaNLastSymbol = isNaN(lastSymbol);
            const inputNumbers = this.getInputNumbers(symbol);

            if(symbol == ',' && isNaNLastSymbol){
                this.Append('0'+symbol);
                return;
            }

            const lastNumber = inputNumbers.slice(-1)[0].slice(0, -1);

            if((symbol == ',' && lastNumber.includes(',')) ||
                (symbol == '0' && lastNumber == '0')
            ){ 
                return;
            }

            if((lastNumber == '0' && !isNaNSymbol) ||
                (isNaNSymbol && isNaNLastSymbol)
            ){
                this.ReplaceLast(symbol);
                return;
            }

            this.Append(symbol);                
        }
    }

    GetInput() {
        return this.input;
    }

    ClearInput() {
        this.input = '0';
    }

    CalcResult() {

    }
}