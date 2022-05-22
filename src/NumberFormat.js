class NumberFormat {
    constructor(number) {
        this.number = number;
    }

    toOutputFormat() {
        if (this.number === '') {
            return this.number;
        }

        const [intPart, floatPart] = this.number.split('.');

        if (intPart.length > INPUT_MAX_SIZE) {
            const convertedNumber = this.convertToExponantial(this.number);

            const [mantissa, power] = convertedNumber.split('e');
            const rounded = this.round(EXPONANTIAL_PRECISION, mantissa);
            const res = `${rounded}e${power}`;

            return res;
        }

        if (!floatPart || floatPart.length <= NUMBER_PRECISION) {
            return this.number;
        }        

        const rounded = this.round(NUMBER_PRECISION);
        return rounded;
    }

    toNumber(number = this) {
        return Number(number);
    }

    convertToExponantial(number) {
        return Number(number).toExponential(EXPONANTIAL_PRECISION).toString();
    }

    round(decimals, number = this.number) {
        const res = Math.round(Number(number) * Math.pow(10, decimals))/Math.pow(10, decimals);
        return res.toString();
    }
}