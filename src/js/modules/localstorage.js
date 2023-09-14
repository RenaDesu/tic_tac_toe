const clearStatsBtn = document.querySelector('[data-clear]');
const statsPlayerX = document.querySelector('#X');
const statsPlayerO = document.querySelector('#O');
const statsDraw = document.querySelector('#D');

//Очистка статистики (по клику)
clearStatsBtn.addEventListener('click', clearStats);

//Вывод статистики на страницу
function showStats() {
    if (localStorage.getItem('GameStats') != null) {
        const stats = JSON.parse(localStorage.getItem('GameStats'));
        statsPlayerX.innerHTML = stats.X;
        statsPlayerO.innerHTML = stats.O;
        statsDraw.innerHTML = stats.D;
    }
}
//Очистка статистики (по клику)
function clearStats() {
    const stats = {
        'X': 0,
        'O': 0,
        'D': 0
    }
    localStorage.setItem('GameStats', JSON.stringify(stats));
    statsPlayerX.innerHTML = 0;
    statsPlayerO.innerHTML = 0;
    statsDraw.innerHTML = 0;
}

showStats();