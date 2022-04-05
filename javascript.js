const choices = ["rock", "paper", "scissors"];
let playerWins = 0;
let computerWins = 0;
let isStarted = false;

// EventListener for playerSelection
const buttons = document.querySelectorAll("#human>button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isStarted) {
      playRound(button.id, computerPlay());
    }
  });
});

function computerPlay() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    displayResult("tie", playerSelection, computerSelection);
  } else if (
    (playerSelection == "rock" && computerSelection == "paper") ||
    (playerSelection == "scissors" && computerSelection == "rock") ||
    (playerSelection == "paper" && computerSelection == "scissors")
  ) {
    computerWins++;
    displayResult("lose", playerSelection, computerSelection);
  } else {
    playerWins++;
    displayResult("win", playerSelection, computerSelection);
  }
}

function displayResult(result, playerSelection, computerSelection) {
  let message;
  if (result == "lose") {
    hideLife("player");
    message = `You lose the round! ${capitalize(
      computerSelection
    )} beats ${capitalize(playerSelection)}!`;
  } else if (result == "win") {
    hideLife("computer");
    message = `You win the round! ${capitalize(
      playerSelection
    )} beats ${capitalize(computerSelection)}!`;
  } else {
    message = "It's a tie!";
  }
  updateScore();
  if (isGameOver()) {
    isStarted = false;
    message = message.includes("win")
      ? "You won the game!"
      : "You lost the game!";
    message += "\r\nPlay again?";
    updateMessage(message);
    appendStartScreen();
  } else {
    updateMessage(message);
  }
}

// Helper functions for displayResult
function hideLife(actor) {
  if (actor === "player") {
    animateFlickering("blue");
  } else if (actor === "computer") {
    animateFlickering("red");
  }
}
function animateFlickering(color) {
  let heart = document.querySelector(`#life--bar > .${color}:not(.empty)`);
  heart.src = `./images/${color}-half.png`;
  setTimeout(() => {
    heart.src = "./images/empty-heart.png";
  }, 500);
  setTimeout(() => {
    heart.src = `./images/${color}-half.png`;
  }, 1000);
  setTimeout(() => {
    heart.src = "./images/empty-heart.png";
  }, 1500);
  heart.classList.add("empty");
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function updateScore() {
  let scoreBoard = document.getElementById("score--board");
  scoreBoard.textContent = `${playerWins} - ${computerWins}`;
}
function updateMessage(message) {
  let container = document.querySelector(".arena");
  let nodes = Array.from(container.childNodes);
  nodes.forEach((node) => node.remove());
  let paragraph = document.createElement("p");
  paragraph.textContent = message;
  container.appendChild(paragraph);
}
function isGameOver() {
  return computerWins == 5 || playerWins == 5;
}
function appendStartScreen() {
  let container = document.querySelector(".arena");
  let startButton = document.createElement("button");
  startButton.classList.add("action--button");
  startButton.style.marginTop = "20px";
  startButton.textContent = "Restart";
  container.appendChild(startButton);
  startButton.addEventListener("click", () => window.location.reload());
}

//eventlisteners for button and coin animations
const coin = document.querySelector(".coin");
const startButton = document.querySelector(".action--button.disappear");
startButton.addEventListener("click", () => {
  startButton.classList.add("pressed");
  setTimeout(() => {
    startButton.style.top = "75vh";
    startButton.style.outline = "none";
    coin.style.top = "75vh";
    coin.style.outline = "none";
    isStarted = true;
  }, 500);
});

startButton.addEventListener("transitionend", (e) => {
  if (e.propertyName == "top") {
    startButton.remove();
    coin.remove();
    let container = document.querySelector(".arena");
    let element = document.createElement("p");
    element.textContent = "Make your pick!";
    container.appendChild(element);
  }
});
