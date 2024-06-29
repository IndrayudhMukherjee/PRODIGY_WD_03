const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const chooseX = document.getElementById('chooseX');
const chooseO = document.getElementById('chooseO');
const selection = document.getElementById('selection');
const gameBoard = document.getElementById('gameBoard');

let currentPlayer = '';
let playerMarker = '';
let computerMarker = '';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    message.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === playerMarker ? computerMarker : playerMarker;
  message.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] === currentPlayer &&
           gameState[a] === gameState[b] &&
           gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = playerMarker;
  message.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = '');
}

function chooseMarker(marker) {
  playerMarker = marker;
  computerMarker = marker === 'X' ? 'O' : 'X';
  currentPlayer = playerMarker;
  gameActive = true;
  message.textContent = `It's ${currentPlayer}'s turn`;
  selection.style.display = 'none';
  gameBoard.style.display = 'grid';
  resetBtn.style.display = 'inline-block';
}

chooseX.addEventListener('click', () => chooseMarker('X'));
chooseO.addEventListener('click', () => chooseMarker('O'));

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

window.onload = () => {
  selection.style.display = 'block';
}
