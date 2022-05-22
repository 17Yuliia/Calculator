const OPTIONS = {
    equal: 'equal',
    number: 'number',
    action: 'action',
    operation: 'operation',
}

const OPERATIONS = {
    plus: '+',
    minus: '-',
    multiply: '*',
    divide: '/',
}

const BUTTONS = {
    number0: {
        name: 'number0',
        value: '0',
        label: '0',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray  button_doublewidth',
    },
    number1: {
        name: 'number1',
        value: '1',
        label: '1',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number2: {
        name: 'number2',
        value: '2',
        label: '2',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number3: {
        name: 'number3',
        value: '3',
        label: '3',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number4: {
        name: 'number4',
        value: '4',
        label: '4',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number5: {
        name: 'number5',
        value: '5',
        label: '5',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number6: {
        name: 'number6',
        className: '',
        value: '6',
        label: '6',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number7: {
        name: 'number7',
        value: '7',
        label: '7',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number8: {
        name: 'number8',
        value: '8',
        label: '8',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    number9: {
        name: 'number9',
        value: '9',
        label: '9',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    point: {
        name: 'point',
        value: '.',
        label: '.',
        option: OPTIONS.number,
        className: 'button keyboard-block__button button_text button_color_darkgray',
    },
    plus: {
        name: 'plus',
        value: OPERATIONS.plus,
        label: '+',
        option: OPTIONS.operation,
        className: 'button keyboard-block__button button_text button_color_orange',
    },    
    minus: {
        name: 'minus',
        value: OPERATIONS.minus,
        label: '−',
        option: OPTIONS.operation,
        className: 'button keyboard-block__button button_text button_color_orange',
    },
    multiply: {
        name: 'multiply',
        value: OPERATIONS.multiply,
        label: '×',
        option: OPTIONS.operation,
        className: 'button keyboard-block__button button_text button_color_orange',
    },
    divide: {
        name: 'divide',
        value: OPERATIONS.divide,
        label: '÷',
        option: OPTIONS.operation,
        className: 'button keyboard-block__button button_text button_color_orange',
    },
    cancel: {
        name: 'cancel',
        value: 'Escape',
        label: 'C',
        option: OPTIONS.action,
        className: 'button keyboard-block__button button_text button_color_lightgray',
    },
    backspace: {
        name: 'backspace',
        value: 'Backspace',
        label: '🡠',
        option: OPTIONS.action,
        className: 'button keyboard-block__button button_text button_color_lightgray',
    },
    sign: {
        name: 'sign',
        value: 'Sign',
        label: '±',
        option: OPTIONS.action,
        className: 'button keyboard-block__button button_text button_color_lightgray',
    },
    equal: {
        name: 'equal',
        value: 'Enter',
        label: '=',
        option: OPTIONS.equal,
        className: 'button keyboard-block__button button_text button_color_orange',
    },
}

const BUTTONS_SEQUANCE = [
    'cancel', 'backspace', 'sign', 'divide',
    'number7', 'number8', 'number9', 'multiply',
    'number4', 'number5', 'number6', 'minus',
    'number1', 'number2', 'number3', 'plus',
    'number0', 'point', 'equal'
]

const ELEMENT_IDS = {
    input: 'input',
    history: 'history',
    keyboard: 'keyboard',
}

const SIGNED_VALUES = {
    '': '-',
    '-': '',
    '0': '-0',
    '-0': '0',
}

const INPUT_MAX_SIZE = 9;
const NUMBER_PRECISION = 8;
const EXPONANTIAL_PRECISION = 6;