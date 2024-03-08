//Try to implement restarting the game after it is gameOver. Bug when trying --> Pegs marked on the wrong row after winning
//Try to mark first peg of each row automatically
//Bug: when adding restart function to the end of the game (winning). Active row is always the second row. All played rows before winning are also active to be clicked on (they enlarge but don’t accept colors. Colors go on the second row.

// Bug: When game starts with page reload the only clickable pegs are the ones on the current row. After you loose or play until certain row and restart with the start new game button, the pegs of the played rows don’t loose the .selected class.

//Remove reminders from the code

//When the game is over make #rowS-result show message: Try again --> when clicked it starts a new game
//Or show message Win and shpw secret pegs OR open a modal to ask if the player wants to play again.

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
  startGame();
  let newGameButton = document.getElementById("newGame");
  newGameButton.addEventListener("click", resetGame);
});

// Variables assigned out of any function so it is acessible to other functions as well
let secretCode = [];
let arrOfPickedColors = [];
let currentRow = 0;
let selectedColor = "";
let selectedTargetPegId = "";
let selectedColorObj = {};
let result = {};
let sumOfCorrect = 0;
let sumOfWrongPlace = 0;

function resetGame() {
  resetPegs();
  secretCode = [];
  arrOfPickedColors = [];
  currentRow = 0;
  selectedColor = "";
  selectedTargetPegId = "";
  selectedColorObj = {};
  result = {};
  sumOfCorrect = 0;
  sumOfWrongPlace = 0;
  startGame();
}

function resetPegs() {
  // Select all Guest Pegs
  let allGuessPegs = document.querySelectorAll(".guess-pegs");
  // Reset styles and remove event listeners from all guess pegs
  for (let GuessPeg of allGuessPegs) {
    if (GuessPeg.classList.contains("selected")) {
      GuessPeg.classList.remove("selected");
    }
    GuessPeg.style.backgroundColor = "white";
    GuessPeg.style.border = "solid 1px black";
    GuessPeg.removeEventListener("click", selectTargetPeg);
    GuessPeg.removeEventListener("click", handleSelected);
  }
  // Select all Result Pegs
  let allResultPegs = document.querySelectorAll(".result-pegs");
  // Remove class active from all result pegs
  for (let ResultPeg of allResultPegs) {
    if (ResultPeg.classList.contains("active")) {
      ResultPeg.classList.remove("active");
    }
    ResultPeg.style.backgroundColor = "gray";
  }
}

function startGame() {
  moveNextRow();
  addClickActiveCurrRow();
  generateSecretCode();
}

// Move current row to be the next row
function moveNextRow() {
  currentRow++;
  return currentRow;
}

// Add event listeners to guess pegs and class active to result pegs of the current row
function addClickActiveCurrRow() {
  let currRowElement = document.getElementById(currentRow.toString());
  let guessPegsCurrRow = currRowElement.querySelectorAll(".guess-pegs");
  for (let guessPegCurrRow of guessPegsCurrRow) {
    guessPegCurrRow.style.border = "solid 3px green";
    guessPegCurrRow.addEventListener("click", selectTargetPeg);
    guessPegCurrRow.addEventListener("click", handleSelected);
  }
  let resultPanelCurrRow = currRowElement.querySelector(".result-panel");
  let ResPegsCurrRow = resultPanelCurrRow.querySelectorAll(".result-pegs");
  for (let ResPegCurrRow of ResPegsCurrRow) {
    ResPegCurrRow.classList.add("active");
  }
}

function handleSelected() {
  // Remove 'selected' class from previously selected div
  for (let prevSelectedGuessPeg of document.querySelectorAll(
    ".guess-pegs.selected"
  )) {
    prevSelectedGuessPeg.classList.remove("selected");
  }
  // Add 'selected' class to the clicked div
  this.classList.add("selected");
}

/**Function to generate the secret code (random colorpick) once the page is
 * loaded and upon completing or restarting the game
 * Note: It allows the same color to be chosen multiple times */
function generateSecretCode() {
  let colors = ["blue", "red", "orange", "pink", "green", "purple"];
  for (let i = 0; i < 4; i++) {
    secretCode.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  // To assign the color to the pegs on the secret row
  let code1 = document.getElementById("rowS-1");
  code1.style.backgroundColor = secretCode[0];
  let code2 = document.getElementById("rowS-2");
  code2.style.backgroundColor = secretCode[1];
  let code3 = document.getElementById("rowS-3");
  code3.style.backgroundColor = secretCode[2];
  let code4 = document.getElementById("rowS-4");
  code4.style.backgroundColor = secretCode[3];
}

// User clicks on one of the pegs of the active row (marked with different color board)
function selectTargetPeg(event) {
  selectedTargetPegId = "";
  selectedTargetPegId = event.target.getAttribute("id");
}

// After choosing a peg from the active row, the user clicks on a color to choose it
function selectColor(color) {
  selectedColor = "";
  selectedColor = color;
  changeColor();
}

// Chamges color of the selected peg on the current row
function changeColor() {
  if (selectedTargetPegId !== "" && selectedColor !== "") {
    let currentPeg = document.getElementById(selectedTargetPegId);
    currentPeg.style.backgroundColor = selectedColor;
    selectedColorObj[selectedTargetPegId] = selectedColor;
  } else {
    alert("Please select a peg from the current row.");
  }
}

let playButton = document.getElementById("play");
playButton.addEventListener("click", computeResult);

function computeResult() {
  // to stop user beign able to change pegs colors on played row
  selectedTargetPegId = "";
  //Count the amount of key-value pairs on the selectedColorObj to make sure the user picked a color for each peg
  let count = Object.keys(selectedColorObj).length;
  if (count === 4) {
    createArrOfPickedColors();
    // remove highlight of last clicked peg
    for (let prevSelectedGuessPeg of document.querySelectorAll(
      ".guess-pegs.selected"
    )) {
      prevSelectedGuessPeg.classList.remove("selected");
    }
    checkResult(secretCode, arrOfPickedColors);
  } else {
    alert("Please choose all your colors.");
  }
}

function createArrOfPickedColors() {
  // To sort id names (keys) alphabetically
  let sortedIds = Object.keys(selectedColorObj).sort();
  for (let id of sortedIds) {
    let color = selectedColorObj[id];
    arrOfPickedColors.push(color);
  }
}

function checkResult(arr1, arr2) {
  // To keep track of which indexes were matched
  let checkedIndexes = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      sumOfCorrect++;
      checkedIndexes.push(i);
    }
  }
  // For each element of the User's guess (arr2) that is not a perfect macth, we search for its presence in the Secret code (arr1) at different positions, chhecking if the current position hasn't been already checked as a perfect match.
  for (let i = 0; i < arr2.length; i++) {
    if (arr1[i] !== arr2[i]) {
      for (let j = 0; j < arr1.length; j++) {
        if (arr1[j] === arr2[i] && !checkedIndexes.includes(j)) {
          sumOfWrongPlace++;
          checkedIndexes.push(j);
          // To move to the next element in User's pick (arr2)
          break;
        }
      }
    }
    result.perfectMatch = sumOfCorrect;
    result.wrongPlace = sumOfWrongPlace;
  }
  giveUserFeedback();
  if (sumOfCorrect === 4) {
    //User wins
    alert("Congratulations! You cracked the code!!");
    resetGame();
  } else if (currentRow === 10) {
    alert("GameOver. You have used all your chances. Good luck next time!");
    resetGame();
    //include to change style visibility of secret code to visible. Can't forget!!!!!********************
  } else {
    // Move to the next row
    moveNextRow();
    addClickActiveCurrRow();
    moveToNextRow();
    sumOfCorrect = 0;
    sumOfWrongPlace = 0;
    arrOfPickedColors = [];
    result = {};
    selectedColorObj = {};
    selectedColor = "";
    selectedTargetPegId = "";
  }
}

function giveUserFeedback() {
  let firstResultPeg = document.getElementsByClassName("active")[0];
  let secondResultPeg = document.getElementsByClassName("active")[1];
  let thirdResultPeg = document.getElementsByClassName("active")[2];
  let fourthResultPeg = document.getElementsByClassName("active")[3];

  if (sumOfCorrect === 4) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "black";
    thirdResultPeg.style.backgroundColor = "black";
    fourthResultPeg.style.backgroundColor = "black";
  } else if (sumOfCorrect === 3 && sumOfWrongPlace === 0) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "black";
    thirdResultPeg.style.backgroundColor = "black";
  } else if (sumOfCorrect === 3 && sumOfWrongPlace === 1) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "black";
    thirdResultPeg.style.backgroundColor = "black";
    fourthResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 2 && sumOfWrongPlace === 0) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "black";
  } else if (sumOfCorrect === 2 && sumOfWrongPlace === 1) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "black";
    thirdResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 2 && sumOfWrongPlace === 2) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "black";
    thirdResultPeg.style.backgroundColor = "white";
    fourthResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 1 && sumOfWrongPlace === 0) {
    firstResultPeg.style.backgroundColor = "black";
  } else if (sumOfCorrect === 1 && sumOfWrongPlace === 1) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 1 && sumOfWrongPlace === 2) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "white";
    thirdResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 1 && sumOfWrongPlace === 3) {
    firstResultPeg.style.backgroundColor = "black";
    secondResultPeg.style.backgroundColor = "white";
    thirdResultPeg.style.backgroundColor = "white";
    fourthResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 0 && sumOfWrongPlace === 1) {
    firstResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 0 && sumOfWrongPlace === 2) {
    firstResultPeg.style.backgroundColor = "white";
    secondResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 0 && sumOfWrongPlace === 3) {
    firstResultPeg.style.backgroundColor = "white";
    secondResultPeg.style.backgroundColor = "white";
    thirdResultPeg.style.backgroundColor = "white";
  } else if (sumOfCorrect === 0 && sumOfWrongPlace === 4) {
    firstResultPeg.style.backgroundColor = "white";
    secondResultPeg.style.backgroundColor = "white";
    thirdResultPeg.style.backgroundColor = "white";
    fourthResultPeg.style.backgroundColor = "white";
  }
}

// Move to the next row
function moveToNextRow() {
  if (currentRow >= 2) {
    // Remove event listeners from guess pegs of the previous row
    let prevRow = document.getElementById((currentRow - 1).toString());
    let prevGuessPegs = prevRow.querySelectorAll(".guess-pegs");
    let prevResPanel = prevRow.querySelector(".result-panel");
    let prevResPegs = prevResPanel.querySelectorAll(".result-pegs");
    for (let prevGuessPeg of prevGuessPegs) {
      prevGuessPeg.removeEventListener("click", selectTargetPeg);
      prevGuessPeg.style.border = "solid 1px black";
    }
    // Remove class active from result pegs of the previous row
    for (let prevResPeg of prevResPegs) {
      prevResPeg.classList.remove("active");
    }
  }
}

// Modal
/* inspired on the modal tutorial from https://www.youtube.com/watch?v=gLWIYk0Sd38 */
let rulesBtn = document.getElementById("rules");
let modal = document.getElementById("bg-modal");
let closeModal = document.getElementById("closeModal");

rulesBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});
