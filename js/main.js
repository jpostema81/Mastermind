const btnCheck = $('#btnCheck');
const btnReset = $('#btnReset');
const btnRed = $('#btnRed');
const btnGreen = $('#btnGreen');
const btnBlue = $('#btnBlue');
const btnYellow = $('#btnYellow');

$(document).ready(function () {
    generate();

    btnCheck.on('click', () => check());
    btnReset.on('click', () => reset());
});

function generate() {
    // TODO: Write generate().
}

function check() {
    // TODO: Write check().
}

function reset() {
    // TODO: Write reset().
}

const Color = {
    RED: 1,
    GREEN: 2,
    BLUE: 3,
    YELLOW: 4
};