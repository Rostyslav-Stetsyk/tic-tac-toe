const ticTacToeRef = document.querySelector('.js-tic-tac-toe');
const turnRef = ticTacToeRef.children[0].firstElementChild;
const playBoardRef = ticTacToeRef.children.item(1);
const numberOfBox = 9;

function createPlayboard() {
    playBoardRef.innerHTML = playBoardMarkup();
    playBoardRef.style.pointerEvents = 'all'; 
};

function playBoardMarkup() {
    const markup = [];
    for (let i = 1; i <= numberOfBox; i+=1) {
        markup.push(`<div class="box" data-id="${i}"></div>`)
    };
    return markup.join('');
}

createPlayboard();

ticTacToeRef.addEventListener('click', onClickPlayBoard);

const cross = `<div class="cross">
    <span class="first-line"></span><span class="second-line"></span>
  </div>`;

const circle = `<div class="circle">
    <span class="first-cycle"></span>
  </div>`;

let player = 'X';
const playerX = [];
const playerO = [];
const winingSets = [[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[3, 5, 7]];

function onClickPlayBoard(e) {
    if (e.target === e.currentTarget ||
        e.target.classList.contains('turn-player') ||
        e.target.classList.contains('turn') ||
        e.target.classList.contains('playboard')) {
        return;
    }

    if (e.target.children[0]) {
        if (e.target.children[0].classList.contains('cross') ||
            e.target.children[0].classList.contains('circle')) {
            return;
        };
    }

    if (e.target.classList.contains('restart')) {
        restart();
        return;
    }

    if (player === 'X') {
        e.target.innerHTML = cross;
        playerX.push(Number(e.target.dataset.id));
        player = 'O';
        turnRef.textContent = 'O';
        turnRef.classList.toggle('player-o');
        if (playerX.length >= 3) {
            if (winner(playerX)) {
                const instance = basicLightbox.create(`<div class='modal'><h2>Player <span class="player-x">X</span> wins!</h2></div>`);
                playBoardRef.style.pointerEvents = 'none';
                instance.show();
            }
        }
    } else if (player === 'O') {
        e.target.innerHTML = circle;
        playerO.push(Number(e.target.dataset.id));
        player = 'X';
        turnRef.textContent = 'X';
        turnRef.classList.toggle('player-o');
        if (playerO.length >= 3) {
            if (winner(playerO)) {
                const instance = basicLightbox.create(`<div class='modal'><h2>Player <span class="player-o">O</span> wins!</h2></div>`);
                playBoardRef.style.pointerEvents = 'none';
                instance.show();
            }
        }
    }

    if (playerO.length + playerX.length === 9 && !winner(playerO) && !winner(playerX)) {
        tie()
    }
}

    function winner(player) {
        const winner = winingSets.some(el => el.every(el => player.includes(el)))
        return winner;
    }


function tie() {
    const instance = basicLightbox.create(`<div class='modal'><h2>It's a tie!</h2></div>`);
    playBoardRef.style.pointerEvents = 'none';
    instance.show();
};

function restart() {
    createPlayboard();
    player = 'X';
    playerX.splice(0);
    playerO.splice(0);
    turnRef.textContent = 'X';
    turnRef.classList.remove('player-o');
}