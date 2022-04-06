const choices = ["rock", "paper", "scissors"];
let playerWins = 0;
let computerWins = 0;
let isStarted = false;

// EventListener for playerSelection
const buttons = document.querySelectorAll("#human>button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isStarted) {
      let computerMove = computerPlay();
      let computerButtons = document.querySelectorAll("#computer>button");
      computerButtons.forEach((cbutton) => {
        if (computerMove === cbutton.id) {
          cbutton.click();
        }
      });
      playRound(button.id, computerMove);
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
    animateFlickering("player");
    message = `You lose the round!\r\n ${capitalize(
      computerSelection
    )} beats ${capitalize(playerSelection)}.`;
  } else if (result == "win") {
    animateFlickering("computer");
    message = `You win the round!\r\n ${capitalize(
      playerSelection
    )} beats ${capitalize(computerSelection)}.`;
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
function animateFlickering(actor) {
  let heart = document.querySelector(`.heart--wrapper > .${actor}:not(.empty)`);
  heart.src = "./images/heart-half.png";
  setTimeout(() => {
    heart.src = "./images/heart-empty.png";
  }, 500);
  setTimeout(() => {
    heart.src = "./images/heart-half.png";
  }, 1000);
  setTimeout(() => {
    heart.src = "./images/heart-empty.png";
  }, 1500);
  setTimeout(() => {
    heart.src = "./images/heart-half.png";
  }, 2000);
  setTimeout(() => {
    heart.src = "./images/heart-empty.png";
  }, 2500);
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
  let container = document.querySelector(".interactive--display");
  let nodes = Array.from(container.childNodes);
  nodes.forEach((node) => node.remove());
  let paragraph = document.createElement("p");
  paragraph.textContent = message;
  paragraph.classList.add("interactive--message");
  container.appendChild(paragraph);
}
function isGameOver() {
  return computerWins == 5 || playerWins == 5;
}
function appendStartScreen() {
  let container = document.querySelector(".interactive--display");
  let restartButton = document.createElement("button");
  restartButton.classList.add("action--button");
  restartButton.style.marginTop = "20px";
  restartButton.style.padding = "10px";
  restartButton.textContent = "Restart";
  container.appendChild(restartButton);
  restartButton.addEventListener("click", () => window.location.reload());
}

/* eventlisteners for animations */
const coin = document.querySelector(".coin");
const startButton = document.querySelector(".action--button.intro--item");
const container = document.querySelector(".interactive--display");
const element = document.createElement("p");

// fly-down effect
startButton.addEventListener("click", () => {
  setTimeout(() => {
    startButton.style.top = "75vh";
    startButton.style.outline = "none";
    coin.style.top = "75vh";
    coin.style.outline = "none";
    isStarted = true;
  }, 100);
});

// remove components that flew out of the screen
startButton.addEventListener("transitionend", (e) => {
  if (e.propertyName == "top") {
    startButton.remove();
    coin.remove();
    container.style.justifyContent = "flex-start";
    element.textContent = "Make your pick!";
    element.classList.add("interactive--message");
    container.appendChild(element);
  }
});

let actionButtons = document.querySelectorAll("#computer>button");
actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let image = button.firstChild.nextSibling;
    image.classList.add("on--click");

    setTimeout(() => {
      image.classList.remove("on--click");
    }, 300);
  });
});

