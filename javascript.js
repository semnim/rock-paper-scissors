function computerPlay() {
  return choices[Math.floor(Math.random() * choices.length)];
}
function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    console.log("It's a tie!");
  } else if (
    (playerSelection == "rock" && computerSelection == "paper") ||
    (playerSelection == "scissors" && computerSelection == "rock") ||
    (playerSelection == "paper" && computerSelection == "scissors")
  ) {
    console.log(
      `You lose the round! ${capitalize(computerSelection)} beats ${capitalize(
        playerSelection
      )}!`
    );
    computerWins++;
  } else {
    console.log(
      `You win the round! ${capitalize(playerSelection)} beats ${capitalize(
        computerSelection
      )}!`
    );
    playerWins++;
  }
}
function game() {
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt("Rock, Paper, Scissors?").toLowerCase();
    const computerSelection = computerPlay();
    console.log(playerSelection, computerSelection);
    playRound(playerSelection, computerSelection);

    if (computerWins == 3) {
      return (winnerMessage = "The Computer wins!");
    } else if (playerWins == 3) {
      return (winnerMessage = "You win!");
    } else if (i == 4) {
      return (winnerMessage = "It's a tie!");
    }
  }
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const choices = ["rock", "paper", "scissors"];
(playerWins = 0), (computerWins = 0);
winnerMessage = game();
console.log(`Game over! ${winnerMessage}`);
