const btnCheck = $('#btnCheck');
const btnReset = $('#btnReset');
const btnRed = $('#btnRed');
const btnGreen = $('#btnGreen');
const btnBlue = $('#btnBlue');
const btnYellow = $('#btnYellow');
const attemptsLeftCounter = $('#attemptsLeft');
const btnExit = $('#btnExit');
const btnStatusExit = $('#btnStatusExit');
const statusMessage = $('#statusMessage');
const status = $('.status');

let code;
let attemptsLeft = 12;
let currentRow = 1;
let currentCol = 1;

$(document).ready(function () {
    status.hide();

    reset(true);
    update();

    btnCheck.on('click', () => check());
    btnReset.on('click', () => reset(false));

    $(document).on('keydown', (e) => {
        let key = (e.keyCode ? e.keyCode : e.which);

        switch (key) {
            // If Enter is pressed.
            case 13:
                return attemptsLeft > 0 ? (status.is(":hidden") ? check() : status.hide()) : reset(true);

            // If Backspace is pressed.
            case 8:
                return reset(false);

            // If '1' is pressed.
            case 49:
                return $('#btnRed').click();

            // If '2' is pressed.
            case 50:
                return $('#btnGreen').click();

            // If '3' is pressed.
            case 51:
                return $('#btnBlue').click();

            // If '4' is pressed.
            case 52:
                return $('#btnYellow').click();
        }
    });

    $(`.row-${currentRow} .dot`).on('click', function (e) {
        $(this).removeClass('dot-red dot-green dot-blue dot-yellow');
        currentCol--;
    });

    $('#btnRed, #btnGreen, #btnBlue, #btnYellow').on('click', function (e) {
        e.preventDefault();

        $(`.row-${currentRow}`).children(`.col-${currentCol++}`).children('div').addClass(`dot-${$(this).attr('color')}`);
    });

    btnExit.on('click', function (e) {
        reset(true);
    })
});

function generate() {
    code = [Color.random(), Color.random(), Color.random(), Color.random()];
    console.log(code);
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
            let color = Color.valueOf(div.classList[1].substring(4));

            tempCode.push(color);
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

    // if (JSON.stringify(tempCode) === JSON.stringify(code)) {
    //     showStatus('You have won!', true);
    // } else
    if (currentRow <= 12 && attemptsLeft-- > 0) {
        for (let i = 0; i < tempCode.length; i++) {
            let dot = $(`.row-${currentRow} .mini-dot-${i + 1}`);

            if (tempCode[i] === code[i]) {
                dot.addClass('correct');
            }

            if (!dot.hasClass('correct') && code.some(v => v === tempCode[i])) {
                dot.addClass('incorrect');
            }
        }

        showStatus('Try again.', false);

        currentRow++;
        currentCol = 1;
        update();
    }
}

function showStatus(message, ended) {
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
        status.hide();
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