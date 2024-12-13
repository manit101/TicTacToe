let currentPlayer = 'X';  
let gameBoard = ['', '', '', '', '', '', '', '', ''];  
let gameOver = false;  

const cells = document.querySelectorAll('.cell');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameOver || gameBoard[index] !== '') return;  
        
        cell.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;  
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    });
});

const restartButton = document.querySelector('button');
restartButton.addEventListener('click', restartGame);

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';  
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = '';  
    });
}
