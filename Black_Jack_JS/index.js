const playerCardsDiv = document.getElementById("player-cards-div");
const dealerCardsDiv = document.getElementById("dealer-cards-div");
const playerSum = document.getElementById("player-sum");
const dealerSum = document.getElementById("dealer-sum");
const chips = document.getElementById("chips");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const doubleBtn = document.getElementById("double-btn");
const splitBtn = document.getElementById("split-btn");
const surrenderBtn = document.getElementById("surrender-btn");
const startBtn = document.getElementById("start-btn");
const dealerCards = [];
const playerCards = [];
const cardsDeck = {
  cardValue: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardCount: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
  cardSuit: ["Diamonds", "Spades", "Hearts", "Clubs"],
};

let alive = true;
let playerChips = 500;
let blackJack = false;

// Render the game

function render() {
  dealerCardsDiv.textContent = dealerCards;

  playerCardsDiv.textContent = "";
  for (i = 0; i < playerCards.length; i++) {
    playerCardsDiv.textContent +=
      playerCards[i].value + playerCards[i].count + playerCards[i].suit;
  }
  dealerSum.textContent = 0;
  let dSum = 0;
  for (i = 0; i < dealerCards.length; i++) {
    dSum += dealerCards[i].count;
  }
  dealerSum.textContent = dSum;
  playerSum.textContent = 0;
  let pSum = 0;
  for (i = 0; i < playerCards.length; i++) {
    pSum += playerCards[i].count;
  }
  playerSum.textContent = pSum;
  chips.textContent = playerChips;
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
  dealCard(playerCards);
  render();
});

render();
