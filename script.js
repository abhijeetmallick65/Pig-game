"use strict";

const Domstring = {
  Dice: document.querySelector(".dice"),
  Roll: document.querySelector(".btn--roll"),
  Hold: document.querySelector(".btn--hold"),
  New: document.querySelector(".btn--new"),
  Player0Score: document.getElementById("current--0"),
  Player1Score: document.getElementById("current--1"),
  Score0: document.getElementById("score--0"),
  Score1: document.getElementById("score--1"),
  Player0: document.querySelector(".player--0"),
  Player1: document.querySelector(".player--1"),
};

//Global stored data
let totalScore, currentScore, currentPlayer, playing;

//Functions
function switchPlayer() {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  Domstring.Player0.classList.toggle("player--active");
  Domstring.Player1.classList.toggle("player--active");
}

function Reset() {
  Domstring.Dice.classList.add("hidden");
  Domstring.Player0Score.textContent = 0;
  Domstring.Player1Score.textContent = 0;
  Domstring.Score0.textContent = 0;
  Domstring.Score1.textContent = 0;

  currentScore = 0;
  currentPlayer = 0;
  totalScore = [0, 0];
  playing = true;

  Domstring.Player0.classList.remove("player--winner");
  Domstring.Player1.classList.remove("player--winner");
  Domstring.Player1.classList.remove("player--activer");
  Domstring.Player0.classList.add("player--activer");
}

Reset();

//rolling dice functionality
Domstring.Roll.addEventListener("click", () => {
  //playing state
  if (playing) {
    // Generate a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //change dice image
    Domstring.Dice.classList.remove("hidden");
    Domstring.Dice.src = `dice-${dice}.png`;

    //adding the score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      totalScore[currentPlayer] = 0;
      document.getElementById(`score--${currentPlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

// Hold functionality
Domstring.Hold.addEventListener("click", () => {
  if (playing) {
    //add current score to active player score
    totalScore[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      totalScore[currentPlayer];
    //check if player's score is >= 100
    if (totalScore[currentPlayer] >= 100) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
      playing = false;
      Domstring.Dice.classList.add("hidden");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Again Button
Domstring.New.addEventListener("click", Reset);
