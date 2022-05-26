const OPTIONS = {
    copy: 'copy',
    equal: 'equal',
    number: 'number',
    action: 'action',
    memory: 'memory',
    operation: 'operation',
}

const OPERATIONS = {
    plus: '+',
    minus: '-',
    multiply: '*',
    divide: '/',
}

const MEMORY_ACTIONS = {
    mRead: 'mRead',
    mSave: 'mSave',
    mPlus: 'mPlus',
    mClear: 'mClear',
    mMinus: 'mMinus',
}

const OPTION_CODES = {
    sign: 'Sign',
    enter: 'Enter',
    escape: 'Escape',
    backspace: 'Backspace',
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
        value: OPTION_CODES.escape,
        label: 'C',
        option: OPTIONS.action,
        className: 'button keyboard-block__button button_text button_color_lightgray',
    },
    backspace: {
        name: 'backspace',
        value: OPTION_CODES.backspace,
        label: '🡠',
        option: OPTIONS.action,
        className: 'button keyboard-block__button button_text button_color_lightgray',
    },
    sign: {
        name: 'sign',
        value: OPTION_CODES.sign,
        label: '±',
        option: OPTIONS.action,
        className: 'button keyboard-block__button button_text button_color_lightgray',
    },
    equal: {
        name: 'equal',
        value: OPTION_CODES.enter,
        label: '=',
        option: OPTIONS.equal,
        className: 'button keyboard-block__button button_text button_color_orange',
    },
    mClear: {
        name: 'mClear',
        value: MEMORY_ACTIONS.mClear,
        label: 'MC',
        option: OPTIONS.memory,
        className: 'button keyboard-block__button button_text button_color_black button_size_small',
    },
    mRead: {
        name: 'mRead',
        value: MEMORY_ACTIONS.mRead,
        label: 'MR',
        option: OPTIONS.memory,
        className: 'button keyboard-block__button button_text button_color_black button_size_small',
    },
    mSave: {
        name: 'mSave',
        value: MEMORY_ACTIONS.mSave,
        label: 'MS',
        option: OPTIONS.memory,
        className: 'button keyboard-block__button button_text button_color_black button_size_small',
    },
    mPlus: {
        name: 'mPlus',
        value: MEMORY_ACTIONS.mPlus,
        label: 'M+',
        option: OPTIONS.memory,
        className: 'button keyboard-block__button button_text button_color_black button_size_small',
    },
    mMinus: {
        name: 'mMinus',
        value: MEMORY_ACTIONS.mMinus,
        label: 'M-',
        option: OPTIONS.memory,
        className: 'button keyboard-block__button button_text button_color_black button_size_small',
    },
    copy: {
        name: 'copy',
        value: 'copy',
        label: '',
        option: OPTIONS.copy,
        className: 'button keyboard-block__button button_copy button_color_darkgray',
    }
}

const BUTTONS_SEQUANCE = [
    'mClear', 'mRead', 'mSave', 'mPlus', 'mMinus',
    'cancel', 'backspace', 'sign', 'divide',
    'number7', 'number8', 'number9', 'multiply',
    'number4', 'number5', 'number6', 'minus',
    'number1', 'number2', 'number3', 'plus',
    'number0', 'point', 'equal',
    'copy',
]

const ELEMENT_IDS = {
    input: 'input',
    memory: 'memory',
    history: 'history',
    keyboard: 'keyboard',
    operation: 'operation',
}

const INPUT_MAX_SIZE = 9;
const NUMBER_PRECISION = 8;
const EXPONANTIAL_PRECISION = 6;