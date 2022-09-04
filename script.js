//////////// Change Theme
let i = 1;

const round = document.getElementsByClassName('round');
const theme = document.documentElement.classList;

function change_theme() {
    if (i === 1) {
        i++;
        theme.remove('style-1');
        theme.add('style-2');
        setTheme('style-2', 2);
    }

    else if (i === 2) {
        i++;
        theme.remove('style-2');
        theme.add('style-3');
        setTheme('style-3', 3);
    }

    else if (i === 3) {
        i++;
        theme.remove('style-3');
        theme.add('style-2');
        setTheme('style-2', 4);
    }

    else {
        i = 1;
        theme.remove('style-2');
        theme.add('style-1');
        setTheme('style-1', 1);
    }
}

function setTheme(themeName, ii) {
    localStorage.setItem('theme', themeName);
    localStorage.setItem('i', ii);
    i = ii;
    document.documentElement.className = themeName;
}

(function () {
    if (localStorage.getItem('i') === '2') {
        setTheme('style-2', 2);
    }
    
    else if (localStorage.getItem('i') === '3') {
        setTheme('style-3', 3);
    }

    else if (localStorage.getItem('i') === '4') {
        setTheme('style-2', 4);
    }

    else {
        setTheme('style-1');
    }
})();
/////////////////////////////////////////////////


//////////// Calculator

const numbers = document.querySelectorAll('#number');
const operators = document.querySelectorAll('#operator');
const del = document.getElementById('del');
const reset = document.getElementById('reset');
const equal = document.getElementById('equal');
const screen = document.querySelector('.screen');

class Calculator {
    constructor() {
        this.reset();
    }

    reset() {
        this.input = '';
        this.operator = '';
        this.expression = '';
    }

    delete() {
        if (this.operator !== '') {
            this.expression = this.expression.slice(0, this.expression.length - 3);
            this.operator = '';
            this.input = this.expression.split(' ');
            this.input = this.input[this.input.length - 1]
        }
        else {
            this.input = this.input.slice(0, -1);
            if (this.input === '') {
                this.operator = ' ';
            }
            this.expression = this.expression.slice(0, -1);
        }
    }

    add_number(number) {
        if (number === '.' && this.input.includes('.')) return
        if (this.input === '' && number === '.') {
            number = '0.';
        }
        this.input = this.input + number;
        this.expression = this.expression + number;
        this.operator = '';
    }

    add_operator(operator) {
        if (this.expression === '') return
        if (this.operator !== '') {
            this.expression = this.expression.slice(0, this.expression.length - 2);
        }
        this.input = '';
        this.operator = operator;
        this.expression = `${this.expression} ${this.operator} `;
    }

    compute() {
        if (this.expression === '') return;
        this.input = (eval(this.expression.replace('x', '*'))).toString();
        this.expression = this.input;
    }

    update() {
        screen.innerHTML = this.expression;
    }
}

const calculator = new Calculator();

reset.addEventListener('click', () => {
    calculator.reset();
    calculator.update();
})

numbers.forEach(i => {
    i.addEventListener('click', () => {
        calculator.add_number(i.innerHTML);
        calculator.update();
    })
})

operators.forEach(i => {
    i.addEventListener('click', () => {
        calculator.add_operator(i.innerHTML);
        calculator.update();
    })
})

del.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
})

equal.addEventListener('click', () => {
    calculator.compute();
    calculator.update();
})