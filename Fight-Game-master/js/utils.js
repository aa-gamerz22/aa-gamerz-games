function rectangularCollision({
    rectangle1,
    rectangle2
}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
};

function determinewinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.getElementById('gameStatus').style.display = 'flex';
    if (player.health === enemy.health) {
        document.getElementById('gameStatus').innerHTML = 'Tie';
    } else if (player.health < enemy.health) {
        document.getElementById('gameStatus').innerHTML = 'Player 2 wins';
    } else if (player.health > enemy.health) {
        document.getElementById('gameStatus').innerHTML = 'Player 1 wins';
    }
}

let timer = 60;
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.getElementById('timer').innerHTML = timer;
    };

    if (timer === 0) {
        determinewinner({ player, enemy });
    }
};
