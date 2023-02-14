const startBtn = document.querySelector(".restart");
const goBtn = document.querySelector("#go");
const guessLeft = document.querySelector(".guess-left");
const guessList = document.querySelector("#guess-list");
const numberInput = document.querySelector("#number");
const gameStatsText = document.querySelector(".game-stats-text");

let gameInProgress = false;
let guessRights = 3;
let guessArray = ["Guess 1: -------", "Guess 2: -------", "Guess 3: -------"];
let guessCounter = -1;

let secretNumber = Math.floor(Math.random() * 10 + 1);
console.log(secretNumber);

startBtn.addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 10 + 1);
  console.log(secretNumber);
  startBtn.disabled = true;
  startBtn.textContent = "Game Time";
  goBtn.disabled = false;
  numberInput.disabled = false;
  numberInput.value = "";
  gameStatsText.textContent = "Game Started. Good Luck!";
  gameInProgress = true;
  guessLeft.textContent = 3;
  guessCounter = -1;
  guessArray = ["Guess 1: -------", "Guess 2: -------", "Guess 3: -------"];
  let listHTML = "";
  for (let i = 0; i < guessArray.length; i++) {
    listHTML += ` <li>${guessArray[i]}</li> `;
  }
  guessList.innerHTML = listHTML;
});

goBtn.addEventListener("click", () => {
  let guess = Number(numberInput.value);
  if (gameInProgress) {
    if (guess >= 1 && guess <= 10) {
      guessCounter++;
      guessArray[guessCounter] = `Guess ${guessCounter + 1}: ===>> ${guess}`;
      let listHTML = "";
      for (let i = 0; i < guessArray.length; i++) {
        listHTML += ` <li>${guessArray[i]}</li> `;
      }
      guessList.innerHTML = listHTML;
      if (guess === secretNumber) {
        gameStatsText.innerHTML = `Bull's Eye!<br />Congratulations.<br/>You guessed the secret number on your ${
          guessRights == 3
            ? "1st try!"
            : guessRights == 2
            ? "2nd try!"
            : "last try!"
        }`;
        gameInProgress = false;
      } else if (guess > secretNumber) {
        gameStatsText.innerHTML = `Oops. A little high. <br />Next time shoot lower.<br/> <br />Good luck mate!`;
        guessRights--;
        guessLeft.textContent = guessRights;
      } else if (guess < secretNumber) {
        gameStatsText.innerHTML = `Man! It was too low!<br />Shoot higher next time.<br/> <br />You got this!`;
        guessRights--;
        guessLeft.textContent = guessRights;
      }
    } else {
      gameStatsText.textContent =
        "Invalid entry. Your guess should be between 1 and 10";
    }
  }
  if (guessRights === 0 || !gameInProgress) {
    if (guessRights === 0) {
      gameStatsText.innerHTML =
        "It was too close. <br/>Don't lose heart.<br/>Click restart to give another try.";
    }
    goBtn.disabled = true;
    numberInput.disabled = true;
    startBtn.disabled = false;
    startBtn.textContent = "Restart";
    guessRights = 3;
    gameInProgress = false;
  }
});
