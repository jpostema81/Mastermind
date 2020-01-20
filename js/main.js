const btnCheck = $('#btnCheck');
const btnReset = $('#btnReset');
const btnRed = $('#btnRed');
const btnGreen = $('#btnGreen');
const btnBlue = $('#btnBlue');
const btnYellow = $('#btnYellow');
const attemptsLeftCounter = $('#attemptsLeft');
const btnStatusReset = $('#btnStatusReset');
const statusMessage = $('#statusMessage');

let code;
let attemptsLeft = 12;
let currentRow = 1;
let currentCol = 1;

$(document).ready(function () {
    reset();
    generate();
    update();

    btnCheck.on('click', () => check());
    btnReset.on('click', () => reset());

    $('#btnRed, #btnGreen, #btnBlue, #btnYellow').on('click', function (e) {
        e.preventDefault();

        $(`.row-${currentRow}`).children(`.col-${currentCol++}`).children('div').addClass(`dot-${$(this).attr('color')}`);
    });
});

function generate() {
    code = [Color.random(), Color.random(), Color.random(), Color.random()];
    console.log(code);
}

// Should perform a check on the current row, to see if the colors correspond to the generated code.
function check() {
    if (attemptsLeft <= 0) {
        showStatus('Game Over!');
        return;
    }

    let tempCode = [];
    let cols = $(`.row-${currentRow}`).children('.col');

    for (let i = 0; i < cols.length; i++) {
        // FIXME: Doesn't work, have to figure out why.
        let div = $(cols[i]).children('div')[0];

        if (div.classList.length > 1) {
            tempCode.push(Color.valueOf(div.classList[1].substring(5)).id);
        }
    }

    if (tempCode.length === 0) {
        alert('Please enter a combination.');
        return;
    }

    if (tempCode === code) {
        alert("You won.");
    } else if (currentRow < 12 && attemptsLeft-- > 0) {
        alert("Wrong. Try again.");

        currentRow++;
        update();
    }
}

function showStatus(message) {
    let status = $('.status');
    statusMessage.text(message);
    status.show();

    btnStatusReset.on('click', function (e) {
        reset();
        status.hide();
    });
}

function update() {
    attemptsLeftCounter.text(attemptsLeft);
}

function reset() {
    currentRow = 1;
    $(`.row`).children(`.col`).children('div').removeClass('dot-red dot-green dot-blue dot-yellow');
}

class Color {
    static RED = {id: 1, name: 'red'};
    static GREEN = {id: 2, name: 'green'};
    static BLUE = {id: 3, name: 'blue'};
    static YELLOW = {id: 4, name: 'yellow'};
    static ALL = [Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW];

    static random() {
        return Color.ALL[Math.floor(Math.random() * Color.ALL.length)];
    }

    static valueOf(input) {
        for (let i = 0; i < Color.ALL.length; i++) {
            if (Color.ALL[i].id === input || Color.ALL[i].name === input) {
                return Color.ALL[i];
            }
        }

        throw new Error("Color doesn't exist.");
    }
}