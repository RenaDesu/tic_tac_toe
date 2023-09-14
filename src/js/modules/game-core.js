import {
    clearStats
} from "./localstorage";

const winner = document.querySelector('[data-winner]');
const cells = document.querySelectorAll('.table__cell');
const gameBoard = document.querySelector('[data-game-board]');
const currentPlayer = document.querySelector('[data-player]');
const restartBtn = document.querySelector('[data-restart]');
const clearStatsBtn = document.querySelector('[data-clear]');

//Игрок по умолчанию
let player = 'X';
//Позиции, которые должен занять игрок для победы
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
//Статистика игр
const stats = {
    'X': 0,
    'O': 0,
    'D': 0
}
//Ставим общий обработчик на таблицу и отлавливаем клик на ячейки
gameBoard.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('table__cell')) {
        fillCells(target);
    }
});
//Заполняем ячейки, отслеживаем ход игры, выводим победителя или ничью
function fillCells(el) {
    let data = [];

    if (!el.innerHTML) {
        el.innerHTML = player;
        el.classList.add('symbol');
    } else {
        return;
    }

    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].id));
        }
    }

    if (detectWinner(data)) {
        stats[player] += 1;
        winner.innerText = player;
        setTimeout(restartGame, 3000);
        setTimeout(clearText, 3000);
    } else {
        let draw = true;

        for (let i in cells) {
            if (cells[i].innerHTML == '') {
                draw = false;
            }
        }
        if (draw) {
            stats.D += 1;
            winner.innerText = 'ничья!';
            setTimeout(restartGame, 3000);
            setTimeout(clearText, 3000);
        }
    }

    player = player == 'X' ? 'O' : 'X';
    currentPlayer.innerHTML = player;
}

//Определяем конец игры и победителя 
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
//Ничинаем игру заново и выводим статистику игры
function restartGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    player = 'X';
    updateStats();
}
//Установка игрока и победителя по умолчанию (для сброса игры)
function clearText() {
    winner.innerText = '';
    currentPlayer.innerHTML = 'X';
}
//Вывод статистики игры
function updateStats() {
    document.querySelector('#X').innerHTML = stats.X;
    document.querySelector('#O').innerHTML = stats.O;
    document.querySelector('#D').innerHTML = stats.D;
    localStorage.setItem('GameStats', JSON.stringify(stats));
}
//Сброс игры по клику
restartBtn.addEventListener('click', () => {
    restartGame();
    clearText();
});
//Обновление статистики
function updateStatsData() {
    if (localStorage.getItem('GameStats') != null) {
        const statsData = JSON.parse(localStorage.getItem('GameStats'));
        stats.X = statsData.X;
        stats.O = statsData.O;
        stats.D = statsData.D;
    }
}
updateStatsData();

//Очистка статистики (по клику)
clearStatsBtn.addEventListener('click', () => {
    clearStats(stats);
});