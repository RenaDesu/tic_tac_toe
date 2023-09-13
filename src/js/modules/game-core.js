const winner = document.querySelector('[data-winner]');
const cells = document.querySelectorAll('.table__cell');

let player = 'X';
let gameEnded = false;
const WIN_POSITIONS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

for (let i = 0; i < cells.length; i++) {

    cells[i].addEventListener('click', fillCells, false);
}

function fillCells() {
    let data = [];

    if (!this.innerHTML) {
        this.innerHTML = player;
        this.classList.add('symbol');
    }

    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].id));
        }
    }

    if (detectWinner(data)) {
        winner.innerText = `${winner.innerText} ${player}`;
    }

    player = player == 'X' ? 'O' : 'X';
}


function detectWinner(data) {
    for (let i in WIN_POSITIONS) {
        let gameEnded = true;

        for (let j in WIN_POSITIONS[i]) {
            let id = WIN_POSITIONS[i][j];
            let index = data.indexOf(id);

            if (index == -1) {
                gameEnded = false;
            }
        }

        if (gameEnded) return true;
    }

    return false;
}