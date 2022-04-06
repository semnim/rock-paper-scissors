/* eventlisteners for start-screen animations */
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
    gameIsStarted = true;
  }, 100);
});

// remove components that flew out of the screen
startButton.addEventListener("transitionend", (e) => {
  if (e.propertyName == "top") {
    startButton.remove();
    coin.remove();
    element.textContent = "Make your pick!";
    element.classList.add("interactive--message");
    container.appendChild(element);
  }
});
/* -------------------------------------------------------------------------------- */

const choices = ["rock", "paper", "scissors"];
let playerWins = 0;
let computerWins = 0;
let gameIsStarted = false;

function computerPlay() {
  return choices[Math.floor(Math.random() * choices.length)];
}

/* EventListener for computer click */
const computerButtons = document.querySelectorAll("#computer>button");
computerButtons.forEach((cbutton) => {
  cbutton.addEventListener("click", () => {
    let buttonImage = cbutton.firstChild.nextSibling;
    buttonImage.classList.add("on--click");
    setTimeout(() => {
      buttonImage.classList.remove("on--click");
    }, 300);
  });
});

// EventListener for playerSelection
const playerButtons = document.querySelectorAll("#human>button");
playerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameIsStarted) {
      let computerMove = computerPlay();
      computerButtons.forEach((cbutton) => {
        if (computerMove === cbutton.id) {
          cbutton.click();
        }
      });
      playRound(button.id, computerMove);
    }
  });
});

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
  switch (result) {
    case "lose":
      animateFlickering("player");
      message = `You lose the round!\n ${capitalize(
        computerSelection
      )} beats ${capitalize(playerSelection)}.`;
      break;
    case "win":
      animateFlickering("computer");
      message = `You win the round!\n ${capitalize(
        playerSelection
      )} beats ${capitalize(computerSelection)}.`;
      break;
    default:
      message = "It's a tie!";
  }
  updateScore();
  if (isGameOver()) {
    gameIsStarted = false;
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
  let emptyHeartImagePath = "./images/heart-empty.png";
  let halfHeartImagePath = "./images/heart-half.png";

  heart.src = halfHeartImagePath;
  setTimeout(() => {
    heart.src = emptyHeartImagePath;
  }, 500);
  setTimeout(() => {
    heart.src = halfHeartImagePath;
  }, 1000);
  setTimeout(() => {
    heart.src = emptyHeartImagePath;
  }, 1500);
  setTimeout(() => {
    heart.src = halfHeartImagePath;
  }, 2000);
  setTimeout(() => {
    heart.src = emptyHeartImagePath;
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
  if (message.includes("lost") || message.includes("won")) {
    let resultMessageSpan = document.createElement("span");
    resultMessageSpan.classList.add("textcolor");
    resultMessageSpan.textContent = message.split(/\n/)[0];

    let playAgainPrompt = document.createElement("p");
    playAgainPrompt.textContent = message.split(/\n/)[1];

    paragraph.appendChild(resultMessageSpan);
    paragraph.appendChild(playAgainPrompt);
  } else {
    paragraph.textContent = message;
  }
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
  restartButton.textContent = "Restart";
  container.appendChild(restartButton);
  restartButton.addEventListener("click", () => window.location.reload());
}
