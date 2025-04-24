// script.js
const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameOver = false;

function createBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = index;
        cellDiv.addEventListener('click', handleClick);
        cellDiv.textContent = cell || '';
        board.appendChild(cellDiv);
    });
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] || isGameOver) return;

    gameState[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateBoard();
}

function updateBoard() {
    createBoard();
    if (!isGameOver) {
        statusText.textContent = `Vez de: ${currentPlayer}`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // linhas
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // colunas
        [0, 4, 8],
        [2, 4, 6], // diagonais
    ];

    for (const [a, b, c] of winPatterns) {
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            statusText.textContent = `Vitória de: ${gameState[a]}`;
            isGameOver = true;
            return;
        }
    }

    if (!gameState.includes(null)) {
        statusText.textContent = 'Empate!';
        isGameOver = true;
    }
}

function resetGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    isGameOver = false;
    updateBoard();
}

createBoard();