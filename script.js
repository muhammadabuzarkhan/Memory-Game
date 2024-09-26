const cardsArray = [
    '🍎', '🍌', '🍇', '🍉',
    '🍎', '🍌', '🍇', '🍉',
    '🍒', '🍋', '🍓', '🍑',
    '🍒', '🍋', '🍓', '🍑'
];

let gameBoard = document.getElementById('gameBoard');
let moveCountDisplay = document.getElementById('moveCount');
let resetButton = document.getElementById('resetButton');
let cards = [];
let firstCard = null;
let secondCard = null;
let moveCount = 0;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    gameBoard.innerHTML = '';
    cards = shuffle(cardsArray).map(symbol => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `<div class="front">${symbol}</div><div class="back">?</div>`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
        return cardElement;
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }

    updateMoveCount();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateMoveCount() {
    moveCount++;
    moveCountDisplay.textContent = moveCount;
}

function resetGame() {
    moveCount = 0;
    moveCountDisplay.textContent = moveCount;
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
