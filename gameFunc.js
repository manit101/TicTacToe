document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const resetButton = document.getElementById("reset");
  const scoreX = document.getElementById("scoreX");
  const scoreO = document.getElementById("scoreO");
  const firstPlayerSelect = document.getElementById("firstPlayer");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;

  const loadScores = () => {
    const storedScores = JSON.parse(localStorage.getItem('scores')); 
    if (storedScores) {
      scoreX.textContent = storedScores.X;  
      scoreO.textContent = storedScores.O;  
    }
  };

  loadScores();  

  const updateScoresInLocalStorage = () => {
    const scores = {
      X: parseInt(scoreX.textContent),
      O: parseInt(scoreO.textContent),
    };
    localStorage.setItem('scores', JSON.stringify(scores)); 
  };

  const handleFirstPlayerChange = () => {
    currentPlayer = firstPlayerSelect.value;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    resetGame();
  };

  firstPlayerSelect.addEventListener("change", handleFirstPlayerChange);

  const handleCellClick = (event) => {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameOver || gameBoard[index] !== "") {
      alert("This cell is already occupied! Please choose a different one.");
      return;
    }

    cell.textContent = currentPlayer;
    gameBoard[index] = currentPlayer;

    checkWinner();

    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        statusText.textContent = `Player ${gameBoard[a]} wins!`;

        if (gameBoard[a] === "X") {
          scoreX.textContent = parseInt(scoreX.textContent) + 1;
        } else {
          scoreO.textContent = parseInt(scoreO.textContent) + 1;
        }

        updateScoresInLocalStorage(); 
        
        gameOver = true;
        setTimeout(() => {
          alert(`Player ${currentPlayer} wins!`);
          resetBoard(); 
        }, 100);
        return;
      }
    }

    if (!gameBoard.includes("")) {
      statusText.textContent = "It's a draw!";
      gameOver = true;
      setTimeout(() => {
        alert("It's a draw!");
        resetBoard(); 
      }, 100);
    }
  };

  const resetGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.textContent = ""));
    gameOver = false;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  };

  const resetBoard = () => {
    setTimeout(() => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((cell) => (cell.textContent = ""));
      currentPlayer = firstPlayerSelect.value; 
      statusText.textContent = `Player ${currentPlayer}'s turn`;
      gameOver = false; 
    }, 1000);
  };

  resetButton.addEventListener("click", () => {
    resetGame();
    localStorage.removeItem('scores');
    scoreX.textContent = "0";
    scoreO.textContent = "0";
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
});
