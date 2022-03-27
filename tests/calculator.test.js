const { it } = require("@jest/globals");

class Calculator {
    
    constructor(){
        this.input = '0';
        this.history = [];
        this.isNewNumber = true;
        this.isAfterResult = false;
    };

    AppendToInput(symbol) {
        this.input += symbol;
    }

    AppendToHistory(number) {
        this.history.push(number);
    }

    ReplaceLastInHistory(symbol) {
        this.history.pop();
        this.history.push(symbol);
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
            this.history = [];
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
            this.history = [];
            this.isAfterResult = false;
        }

        if(this.isNewNumber) {
            if(this.history === []) {
                this.AppendToHistory(0);
                this.AppendToHistory(operation);
                return;
            }
            
            this.ReplaceLastInHistory(operation);

            return;
        }
        
        this.isNewNumber = true;
        const number = this.ValidateInputNumber();
        this.input = '0';
        this.AppendToHistory(Number(number));
        this.AppendToHistory(operation);
    }

    AddComma() {
        if(this.isAfterResult) {
            this.isAfterResult = false;
            this.input = '0.';
            this.history = [];
        }

        if(this.input.length > 8) {
            return;
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
        if(this.isAfterResult) {
            this.isAfterResult = false;
            clearDisplay();
        }

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
        this.history = [];
        this.isNewNumber = true;
    }

    

    CalcResult() {
        if (this.isAfterResult) {
            return this.input;
        }

        this.AppendToHistory(Number(this.ValidateInputNumber()));

        const regFirst = /[÷×%]/;
        const regSecond = /[+\-]/;
        const array = [...this.history];

        const firstResult = this.CalculateByPriority(array, regFirst);
        const totalResult = Array.isArray(firstResult) ? this.CalculateByPriority(firstResult, regSecond) : firstResult;

        this.input = totalResult.toString();    
           
        this.isAfterResult = true;    

        return totalResult;
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

describe('Plus', () => {
    const testData =[
        {
            x: 1,
            y: 2,
            expected: 3
        },
        {
            x: 0.1,
            y: 0.2,
            expected: 0.3
        },
        {
            x: -1,
            y: -2,
            expected: -3
        },
        {
            x: -1,
            y: 2,
            expected: 1
        },
        {
            x: 0.1,
            y: -0.2,
            expected: -0.1
        }
    ]

    const calculator = new Calculator();

    testData.forEach(test => {
        const {
            x,
            y,
            expected
        } = test;

        it(`Should return ${expected} when ${x} + ${y}`, () => {
            const actual = calculator.Plus(x, y);

            expect(actual).toBe(expected);
        })
    })
    
})

describe('Minus', () => {
    const testData =[
        {
            x: 3,
            y: 2,
            expected: 1
        },
        {
            x: 0.3,
            y: 0.2,
            expected: 0.1
        },
        {
            x: -3,
            y: -2,
            expected: -1
        },
        {
            x: -3,
            y: 2,
            expected: -5
        },
        {
            x: 0.1,
            y: -0.2,
            expected: 0.3
        }
    ]

    const calculator = new Calculator();

    testData.forEach(test => {
        const {
            x,
            y,
            expected
        } = test;

        it(`Should return ${expected} when ${x} - ${y}`, () => {
            const actual = calculator.Minus(x, y);

            expect(actual).toBe(expected);
        })
    })
    
})

describe('Multiply', () => {
    const testData =[
        {
            x: 2,
            y: 7,
            expected: 14
        },
        {
            x: 1e+2,
            y: 0.2,
            expected: 20
        },
        {
            x: -2,
            y: -7,
            expected: 14
        },
        {
            x: -0.33333333,
            y: 33333333,
            expected: -11111110.88888889
        },
        {
            x: 2.3e-3,
            y: -0.0067,
            expected: -0.00001541
        },
        {
            x: 0,
            y: 567568,
            expected: 0
        }
    ]

    const calculator = new Calculator();

    testData.forEach(test => {
        const {
            x,
            y,
            expected
        } = test;

        it(`Should return ${expected} when ${x} * ${y}`, () => {
            const actual = calculator.Multiply(x, y);

            expect(actual).toBe(expected);
        })
    })
    
})
// describe('Plus', () => {
//     const testData =[
//         {
//             x: 1,
//             y: 2,
//             expected: 3
//         },
//         {
//             x: 0.1,
//             y: 0.2,
//             expected: 0.3
//         },
//         {
//             x: -1,
//             y: -2,
//             expected: -3
//         },
//         {
//             x: -1,
//             y: 2,
//             expected: 1
//         },
//         {
//             x: 0.1,
//             y: -0.2,
//             expected: -0.1
//         },
//     ]

//     const calculator = new Calculator();

//     testData.forEach(test => {
//         const {
//             x,
//             y,
//             expected
//         } = test;

//         it(`Should return ${expected} when ${x} + ${y}`, () => {
//             const actual = calculator.Plus(x, y);

//             expect(actual).toBe(expected);
//         })
//     })
    
// })
// describe('Plus', () => {
//     const testData =[
//         {
//             x: 1,
//             y: 2,
//             expected: 3
//         },
//         {
//             x: 0.1,
//             y: 0.2,
//             expected: 0.3
//         },
//         {
//             x: -1,
//             y: -2,
//             expected: -3
//         },
//         {
//             x: -1,
//             y: 2,
//             expected: 1
//         },
//         {
//             x: 0.1,
//             y: -0.2,
//             expected: -0.1
//         },
//     ]

//     const calculator = new Calculator();

//     testData.forEach(test => {
//         const {
//             x,
//             y,
//             expected
//         } = test;

//         it(`Should return ${expected} when ${x} + ${y}`, () => {
//             const actual = calculator.Plus(x, y);

//             expect(actual).toBe(expected);
//         })
//     })
    
// })
