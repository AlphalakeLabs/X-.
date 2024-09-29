const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (boardState.every(cell => cell !== '')) {
            alert('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
