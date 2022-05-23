class NumberFormat {
    constructor(number) {
        this.number = number;
        this.formatedNumber = '';
    }

    toOutputFormat() {
        if (this.number === '') {
            return this.number;
        }

        const [intPart, floatPart] = this.number.split('.');

        if (Number(this.number) >= Math.pow(10, INPUT_MAX_SIZE)) {
            this.toExponentialFormat();

            return this.formatedNumber;
        }

        if (floatPart && floatPart.length > NUMBER_PRECISION) {
            this.round(NUMBER_PRECISION, this.number);
        }

        this.setSpaces();
        
        return this.formatedNumber;
    }

    toExponentialFormat(number) {
        const expNumber = Number(number).toExponential(EXPONANTIAL_PRECISION).toString();
        const [mantissa, power] = expNumber.split('e');
        const rounded = this.round(EXPONANTIAL_PRECISION, mantissa);

        this.formatedNumber = `${rounded}e${power}`;
    }

    setSpaces() {
        this.formatedNumber = this.number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    round(decimals, number) {
        const power = Math.pow(10, decimals);
        const result = Math.round(Number(number) * power) / power;

        this.formatedNumber = result.toString();
    }
}