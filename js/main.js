const btnCheck = $('#btnCheck');
const btnReset = $('#btnReset');
const btnRed = $('#btnRed');
const btnGreen = $('#btnGreen');
const btnBlue = $('#btnBlue');
const btnYellow = $('#btnYellow');

let code;
let row;
let col;

$(document).ready(function () {
    reset();
    generate();

    btnCheck.on('click', () => check());
    btnReset.on('click', () => reset());
});

function generate() {
    code = Math.floor(Math.random()) + 1
}

// Should perform a check on the current row, to see if the colors correspond to the generated code.
function check() {
    let tempCode = undefined;
    let divs = $(`.row-1`).children('.col').children('div');

    for (let i = 0; i < divs.length; i++) {
        if (divs[i].classList.length > 1) {
            tempCode = '';

            switch ( divs[i].classList[1]) {
                case 'dot-red':
                    tempCode += 1;
                    break;
                case 'dot-green':
                    tempCode += 2;
                    break;
                case 'dot-blue':
                    tempCode += 3;
                    break;
                case 'dot-yellow':
                    tempCode += 4;
                    break;
                default:
                    tempCode = -1;
                    break;
            }
        }
    }

    if (tempCode === undefined) {
        alert('Please enter a combination.');
        return;
    }

    if (tempCode === code.toString()) {
        alert("You won.");
    } else {
        if (row < 12) {
            alert("Wrong. Try again.");

            row++;
        } else {
            alert("You lost.");
        }
    }
}

function reset() {
    row = 1;
    $(`.row`).children(`.col`).children('div').removeClass('dot-red dot-green dot-blue dot-yellow');
}