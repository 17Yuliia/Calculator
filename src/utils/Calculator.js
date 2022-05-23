const isValidNumber = (value) => {
    if (typeof value !== 'number') {
        throw new Error('Not a number!');
    }

    if (isNaN(value) || Number.isFinite()) {
        throw new Error('Wrong number!');
    }

    return true;
}

class Calculator {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    setX(x) {
        if (isValidNumber(x)) {
            this.x = x;
        }
    }

    setY(y) {
        if (isValidNumber(y)) {
            this.y = y;
        }
    }

    sum = () => {
        return this.x + this.y;
    };

    mul = () => {
        return this.x * this.y;
    };

    sub = () => {
        return this.x - this.y;
    };

    div = () => {
        if (this.y === 0) {
            return 'ERROR';
        }

        return this.x / this.y;
    };
}