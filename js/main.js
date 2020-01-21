const btnCheck = $('#btnCheck');
const btnReset = $('#btnReset');
const btnRed = $('#btnRed');
const btnGreen = $('#btnGreen');
const btnBlue = $('#btnBlue');
const btnYellow = $('#btnYellow');
const attemptsLeftCounter = $('#attemptsLeft');
const btnStatusExit = $('#btnStatusExit');
const statusMessage = $('#statusMessage');

let code;
let attemptsLeft = 12;
let currentRow = 1;
let currentCol = 1;

$(document).ready(function () {
    $('.status').hide();

    reset(true);
    update();

    btnCheck.on('click', () => check());
    btnReset.on('click', () => reset(false));

    $(`.row-${currentRow} .dot`).on('click', function (e) {
        $(this).removeClass('dot-red dot-green dot-blue dot-yellow');
        currentCol--;
    });

    $('#btnRed, #btnGreen, #btnBlue, #btnYellow').on('click', function (e) {
        e.preventDefault();

        $(`.row-${currentRow}`).children(`.col-${currentCol++}`).children('div').addClass(`dot-${$(this).attr('color')}`);
    });
});

function generate() {
    code = [Color.random(), Color.random(), Color.random(), Color.random()];
}

function check() {
    if (attemptsLeft <= 1) {
        showStatus('Game Over!', true);
        return;
    }

    let tempCode = [];
    let cols = $(`.row-${currentRow}`).children('.col');

    for (let i = 0; i < cols.length; i++) {
        let div = $(cols[i]).children('div')[0];

        if (div.classList.length > 1) {
            tempCode.push(Color.valueOf(div.classList[1].substring(4)));
        }
    }

    if (tempCode.length === 0) {
        showStatus('Enter a combination first.', false);
        return;
    }

    if (tempCode.length !== code.length) {
        showStatus("Complete the sequence first.", false);
        return;
    }

    if (JSON.stringify(tempCode) === JSON.stringify(code)) {
        showStatus('You have won!', true);
    } else if (currentRow <= 12 && attemptsLeft-- > 0) {
        showStatus('Try again.', false);

        currentRow++;
        currentCol = 1;
        update();
    }
}

function showStatus(message, ended) {
    let status = $('.status');
    statusMessage.text(message);
    status.show();

    btnStatusExit.on('click', function (e) {
        if (ended) {
            reset(true);
        }

        status.hide();
    });
}

function update() {
    attemptsLeftCounter.text(attemptsLeft);
}

// FIXME: Not working correctly.
function reset(hardReset) {
    // if (sessionStorage.getItem("reset-clicked") === undefined || sessionStorage.getItem("reset-clicked") === String(1)) {
    //     currentCol = 1;
    //     $(`.row-${currentRow}`).children(`.col`).children('div').removeClass('dot-red dot-green dot-blue dot-yellow');
    // } else if (sessionStorage.getItem("reset-clicked") === String(2)) {
        currentRow = 1;
        currentCol = 1;
        $(`.row`).children(`.col`).children('div').removeClass('dot-red dot-green dot-blue dot-yellow');

        if (hardReset) {
            attemptsLeft = 12;
            generate();
        }
    // }
    //
    // let resetClicked = sessionStorage.getItem("reset-clicked");
    // sessionStorage.setItem("reset-clicked", resetClicked === null ? 1 : String(parseInt(resetClicked) + 1));
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