const playerCardsDiv = document.getElementById("player-cards-div");
const dealerCardsDiv = document.getElementById("dealer-cards-div");
const playerSum = document.getElementById("player-sum");
const dealerSum = document.getElementById("dealer-sum");
const chips = document.getElementById("chips");
const bet = document.getElementById("bet");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const surrenderBtn = document.getElementById("surrender-btn");
const nextRound = document.getElementById("next-round");
const startBtn = document.getElementById("start-btn");
const gameMessage = document.getElementById("game-message");
const cardsDeck = {
  cardValue: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardCount: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
  cardSuit: ["♥", "♦", "♣", "♠"],
};

let dealerCards = [];
let playerCards = [];
let dSum = 0;
let pSum = 0;
let alive = false;
let playerChips = 500;
let playerBet = 0;

// Start a game

function startGame() {
  alive = true;
  playerBet = 50;
  playerChips -= playerBet;
  dealerCards = [];
  playerCards = [];
  dSum = 0;
  pSum = 0;
  dealCard(dealerCards);
  dealCard(playerCards);
  dealCard(playerCards);
  gameMessage.textContent = "You bet " + playerBet;
  render();
  // If you get 2 Aces you win
  if (playerCards[0].value === "A" && playerCards[1].value === "A") {
    playerChips += 2 * playerBet;
    gameMessage.textContent = "You win!";
    alive = false;
    render();
  }
}

// Start a fresh game button

startBtn.addEventListener("click", function () {
  playerChips = 500;
  startGame();
});

// Render the game

function render() {
  dealerCardsDiv.innerHTML = "";
  for (i = 0; i < dealerCards.length; i++) {
    dealerCardsDiv.innerHTML += `
    <div class="card">
      <span class="card-value suit-${dealerCards[i].suit}">${dealerCards[i].value}</span>
      <span class="card-suit suit-${dealerCards[i].suit}">${dealerCards[i].suit}</span>
    </div>  
    `;
    // <img class="card-suit suit-${dealerCards[i].suit}" src="images/card-suits.png"></img>
    // dealerCards[i].value + " " + dealerCards[i].suit + "  ";
  }
  playerCardsDiv.innerHTML = "";
  for (i = 0; i < playerCards.length; i++) {
    playerCardsDiv.innerHTML += `
    <div class="card">
      <span class="card-value suit-${playerCards[i].suit}">${playerCards[i].value}</span>
      <span class="card-suit suit-${playerCards[i].suit}">${playerCards[i].suit}</span>
    </div>
    `;

    // playerCards[i].value + " " + playerCards[i].suit + "  ";
  }
  dSum = 0;
  dealerSum.textContent = 0;
  for (i = 0; i < dealerCards.length; i++) {
    dSum += dealerCards[i].count;
  }
  dealerSum.textContent = "Dealer's sum: " + dSum;
  pSum = 0;
  playerSum.textContent = 0;
  for (i = 0; i < playerCards.length; i++) {
    pSum += playerCards[i].count;
  }
  playerSum.textContent = "Your sum: " + pSum;
  bet.textContent = "You bet " + playerBet + " chips";
  chips.textContent = "You have " + playerChips + " chips";
}

// Deal a random card from the cardsDeck

function dealCard(cardsArray) {
  let i = Math.floor(Math.random() * cardsDeck.cardValue.length);
  let card = {
    value: cardsDeck.cardValue[i],
    count: cardsDeck.cardCount[i],
    suit: cardsDeck.cardSuit[
      Math.floor(Math.random() * cardsDeck.cardSuit.length)
    ],
  };
  cardsArray.push(card);
}

// Hit button

hitBtn.addEventListener("click", function () {
  if (alive === true) {
    dealCard(playerCards);
    render();
    if (pSum > 21) {
      // Aces can be 11 or 1
      if (playerCards.length === 3) {
        for (i = 0; i < 2; i++) {
          if (playerCards[i].count === 11) {
            playerCards[i].count = 1;
          }
        }
        render();
      }
      if (pSum > 21) {
        alive = false;
        gameMessage.textContent = "You are over 21, You lose!";
      }
    }
  }
});

// Function compare hands

function compareHands() {
  if (dSum < pSum || dSum > 21) {
    playerChips += 2 * playerBet;
    gameMessage.textContent = "You win!";
  } else if (dSum === pSum) {
    playerChips += playerBet;
    gameMessage.textContent = "It's a tie!";
  } else {
    playerBet = 0;
    gameMessage.textContent = "You lose!";
  }
}

// Function Dealer

function dealer() {
  do {
    dealCard(dealerCards);
    render();
  } while (dSum < 17);
  compareHands();
}

// Stand button

standBtn.addEventListener("click", function () {
  if (alive === true) {
    dealer();
    alive = false;
  }
});

// Next round button

nextRound.addEventListener("click", function () {
  if (alive === false) {
    startGame();
  }
});

// Surrender button

surrenderBtn.addEventListener("click", function () {
  if (playerCards.length === 2) {
    alive = false;
    playerChips += playerBet / 2;
    gameMessage.textContent = "You gave up! But you get half of your bet back!";
  }
});

render();
