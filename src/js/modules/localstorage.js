const statsPlayerX = document.querySelector('#X');
const statsPlayerO = document.querySelector('#O');
const statsDraw = document.querySelector('#D');

//Вывод статистики на страницу
function showStats() {
    if (localStorage.getItem('GameStats') != null) {
        const stats = JSON.parse(localStorage.getItem('GameStats'));
        statsPlayerX.innerHTML = stats.X;
        statsPlayerO.innerHTML = stats.O;
        statsDraw.innerHTML = stats.D;
    }
}
showStats();

//Очистка статистики (по клику)
export function clearStats(stats) {
    stats.X = 0;
    stats.O = 0;
    stats.D = 0;

    localStorage.setItem('GameStats', JSON.stringify(stats));
    statsPlayerX.innerHTML = 0;
    statsPlayerO.innerHTML = 0;
    statsDraw.innerHTML = 0;
}