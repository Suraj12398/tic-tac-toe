// Game state
let board = ['', '', '', '', '', '', '', '', '']; // Represents the Tic-Tac-Toe board
let currentPlayer = 'X'; // Current player ('X' or 'O')
let gameOver = false; // Flag to track if the game is over

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];
document.querySelector('.game-over').style.display = 'none';
// Function to handle cell click event
function handleCellClick(index) {

    document.querySelector('.game-over').style.display = 'block';

    if (!gameOver && board[index] === '') {
      // Valid move, update the board
      board[index] = currentPlayer;
      const cell = document.querySelector(`[data-value="${index}"]`);
      cell.classList.add(currentPlayer);
      cell.innerText = currentPlayer;
  
      // Check if the current player wins
      if (checkWin(currentPlayer)) {
        gameOver = true;
        displayGameOver(`${currentPlayer} wins!`);
        return;
      }
  
      // Check if it's a draw
      if (checkDraw()) {
        gameOver = true;
        displayGameOver('Draw!');
        return;
      }
  
      // Switch to the next player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.querySelector('.current-player').innerText = `It's ${currentPlayer}'s turn`;
    }
  }
  

// Function to check if the current player wins
function checkWin(player) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (
          board[combination[0]] === player &&
          board[combination[1]] === player &&
          board[combination[2]] === player
        ) {
          return true;
        }
      }
      return false;
}

// Function to check if it's a draw
function checkDraw() {
  return !board.includes('');
}

// Function to display the game over message
function displayGameOver(message) {
  document.querySelector('.game-over-text').innerText = message;
  document.querySelector('.game-over').style.display = 'block';
  document.querySelector('.current-player').style.display='none';
}

// Function to restart the game
function restartGame() {
  // Clear the board
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;

  // Clear the cell contents and classes
const cells = document.querySelectorAll('.grid-cell');
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.classList.remove('X', 'O');
  cell.innerText = "";
}


  // Clear the game over message
  document.querySelector('.game-over-text').innerText = '';

  // Hide the game over section
  document.querySelector('.game-over').style.display = 'none';
  document.querySelector('.current-player').style.display='block';
  // Update the current player display
  document.querySelector('.current-player').innerText = `It's ${currentPlayer}'s turn`;

}

// Add event listeners to the cells
const cells = document.querySelectorAll('.grid-cell');
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', () => handleCellClick(i));
}

// Add event listener to the restart button
document.querySelector('.restart').addEventListener('click', restartGame);
