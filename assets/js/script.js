// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
  let newGameButton = document.getElementById("newGame");
  newGameButton.addEventListener("click", resetGame);

  submitButton.addEventListener("click", computeResult);
  startGame();
});

// Variables assigned out of any function so it is acessible to other functions as well
let secretCode = [];
let arrOfPickedColors = [];
let currentRow = 0;
let selectedColor = "";
let selectedTargetPegId = "row1_1";
let selectedColorObj = {};
let result = {};
let sumOfCorrect = 0;
let sumOfWrongPlace = 0;
let secretRow = document.getElementById("secret");
let submitButton = document.getElementById("submit");

/** Run routine if the game is restarted */
function resetGame() {
  resetPegs();
  secretCode = [];
  arrOfPickedColors = [];
  currentRow = 0;
  selectedColor = "";
  selectedTargetPegId = "row1_1";
  selectedColorObj = {};
  result = {};
  sumOfCorrect = 0;
  sumOfWrongPlace = 0;
  secretRow.style.visibility = "hidden";
  submitButton.style.visibility = "visible";
  startGame();
}

/** Removes event listeners, classes to mark pegs and resets bg colors of played pegs */
function resetPegs() {
  //Select all Guest Pegs
  let allGuessPegs = document.querySelectorAll(".guess-pegs");
  //Reset styles and remove event listeners from all guess pegs
  for (let GuessPeg of allGuessPegs) {
    if (GuessPeg.classList.contains("selected")) {
      GuessPeg.classList.remove("selected");
    }
    GuessPeg.style.backgroundColor = "white";
    GuessPeg.style.border = "transparent";
    GuessPeg.removeEventListener("click", selectTargetPeg);
    GuessPeg.removeEventListener("click", handleSelected);
  }
  //Select all Result Pegs
  let allResultPegs = document.querySelectorAll(".result-pegs");
  //Remove class active from all result pegs
  for (let ResultPeg of allResultPegs) {
    if (ResultPeg.classList.contains("active")) {
      ResultPeg.classList.remove("active");
    }
    ResultPeg.style.backgroundColor = "#c0c0c0";
  }
}

/** Runs routine to start the game, calls moveNetRow,
 * handleCurrentRow and generateSecretCode functions
 */
function startGame() {
  moveNextRow();
  handleCurrentRow();
  generateSecretCode();
  document.getElementById(selectedTargetPegId).classList.add("selected");
}

/** Move the next row to be the current row */
function moveNextRow() {
  currentRow++;
  selectedTargetPegId = "row" + currentRow.toString() + "_" + (+1).toString();
  document.getElementById(selectedTargetPegId).classList.add("selected");
  return currentRow;
}

/** Allows auto selection of active pegs upon starting each row or picking colors */
function moveNextPeg() {
  // Extract last digit from the id's name
  let rowsLastDigit = parseInt(selectedTargetPegId.slice(-1));
  // Check if last digit is less than 4 before incrementing
  if (rowsLastDigit < 4) {
    // Increment last digit
    var newLastDigit = rowsLastDigit + 1;
  } else {
    // Starts again from 1 if last digit is 4
    var newLastDigit = 4;
  }
  selectedTargetPegId =
    "row" + currentRow.toString() + "_" + (+newLastDigit).toString();
  document.getElementById(selectedTargetPegId).classList.add("selected");
  let previousPegId =
    "row" + currentRow.toString() + "_" + (+newLastDigit - 1).toString();
  document.getElementById(previousPegId).classList.remove("selected");
}

/** Marks current row as active, adds even listeners to guess pegs on that row,
 * and marks result pegs as active so they can be used to display the result*/
function handleCurrentRow() {
  let currRowElement = document.getElementById(currentRow.toString());
  let guessPegsCurrRow = currRowElement.querySelectorAll(".guess-pegs");
  for (let i = 0; i < guessPegsCurrRow.length; i++) {
    let guessPegCurrRow = guessPegsCurrRow[i];
    guessPegCurrRow.style.border = "solid 3px #005700";
    guessPegCurrRow.addEventListener("click", selectTargetPeg);
    guessPegCurrRow.addEventListener("click", handleSelected);
  }
  let resultPanelCurrRow = currRowElement.querySelector(".result-panel");
  let ResPegsCurrRow = resultPanelCurrRow.querySelectorAll(".result-pegs");
  for (let ResPegCurrRow of ResPegsCurrRow) {
    ResPegCurrRow.classList.add("active");
  }
}

/** Removes class that marks peg as active from previous pegs */
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
  //Assign the color to the pegs on the secret row
  let code1 = document.getElementById("rowS-1");
  code1.style.backgroundColor = secretCode[0];
  let code2 = document.getElementById("rowS-2");
  code2.style.backgroundColor = secretCode[1];
  let code3 = document.getElementById("rowS-3");
  code3.style.backgroundColor = secretCode[2];
  let code4 = document.getElementById("rowS-4");
  code4.style.backgroundColor = secretCode[3];
}

/** Peg is marked as selected when user clicks on one of the pegs of the active row */
function selectTargetPeg(event) {
  selectedTargetPegId = event.target.getAttribute("id");
}

/** Activates changeColor function upon color selection */
function selectColor(color) {
  selectedColor = "";
  selectedColor = color;
  changeColor();
}

/** Changes color of the selected peg on the active row */
function changeColor() {
  let currentPeg = document.getElementById(selectedTargetPegId);
  currentPeg.style.backgroundColor = selectedColor;
  selectedColorObj[selectedTargetPegId] = selectedColor;
  moveNextPeg();
}

/** Controls if all color have been chosen and activates the
 * createArrOfPickedColors function*/
function computeResult() {
  //Stop user beign able to change pegs colors on played row
  selectedTargetPegId = "";
  //Count the amount of key-value pairs on the selectedColorObj to make sure the user picked a color for each peg
  let count = Object.keys(selectedColorObj).length;
  if (count === 4) {
    createArrOfPickedColors();
    //Remove highlight of last clicked peg
    for (let prevSelectedGuessPeg of document.querySelectorAll(
      ".guess-pegs.selected"
    )) {
      prevSelectedGuessPeg.classList.remove("selected");
    }
  } else {
    alert("Please choose all your colors.");
  }
}

/** Creates an array with the colors picked by the player
 * and calls the checkResult function*/
function createArrOfPickedColors() {
  //Sort id names (keys) alphabetically
  let sortedIds = Object.keys(selectedColorObj).sort();
  for (let id of sortedIds) {
    let color = selectedColorObj[id];
    arrOfPickedColors.push(color);
  }
  checkResult(secretCode, arrOfPickedColors);
}

/** Compares the secretCode with the array of colors
 * picked by the player, calls the giveUserFeedback fucntion and
 * handles the next steps depending if the game is over or continues*/
function checkResult(arr1, arr2) {
  //Keep track of which indexes were matched
  let checkedIndexes = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      sumOfCorrect++;
      checkedIndexes.push(i);
    }
  }
  //For each element of the User's guess (arr2) that is not a perfect macth, we search for its presence in the Secret code (arr1) at different positions, chhecking if the current position hasn't been already checked as a perfect match.
  for (let i = 0; i < arr2.length; i++) {
    if (arr1[i] !== arr2[i]) {
      for (let j = 0; j < arr1.length; j++) {
        if (arr1[j] === arr2[i] && !checkedIndexes.includes(j)) {
          sumOfWrongPlace++;
          checkedIndexes.push(j);
          //To move to the next element in User's pick (arr2)
          break;
        }
      }
    }
    result.perfectMatch = sumOfCorrect;
    result.wrongPlace = sumOfWrongPlace;
  }
  giveUserFeedback();
  if (sumOfCorrect === 4) {
    alert("Congratulations! You cracked the code!!");
    gameOver();
  } else if (currentRow === 10) {
    gameOver();
    alert("Game Over! You have used all your chances. Good luck next time!");
  } else {
    // Move to the next row
    moveNextRow();
    handleCurrentRow();
    moveToNextRow();
    sumOfCorrect = 0;
    sumOfWrongPlace = 0;
    arrOfPickedColors = [];
    result = {};
    selectedColorObj = {};
    selectedColor = "";
  }
}

/** Provides the user visual feedback of the result */
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

/** Runs routine if the game is over */
function gameOver() {
  submitButton.style.visibility = "hidden";
  secretRow.style.visibility = "visible";
  // Select all Guest Pegs
  let allGuessPegs = document.querySelectorAll(".guess-pegs");
  // Reset styles and remove event listeners from all guess pegs
  for (let GuessPeg of allGuessPegs) {
    if (GuessPeg.classList.contains("selected")) {
      GuessPeg.classList.remove("selected");
    }
    GuessPeg.style.border = "transparent";
    GuessPeg.removeEventListener("click", selectTargetPeg);
    GuessPeg.removeEventListener("click", handleSelected);
  }
}

/** Runs routine if the game continues on the next row */
function moveToNextRow() {
  if (currentRow >= 2) {
    // Remove event listeners from guess pegs of the previous row
    let prevRow = document.getElementById((currentRow - 1).toString());
    let prevGuessPegs = prevRow.querySelectorAll(".guess-pegs");
    let prevResPanel = prevRow.querySelector(".result-panel");
    let prevResPegs = prevResPanel.querySelectorAll(".result-pegs");
    for (let prevGuessPeg of prevGuessPegs) {
      prevGuessPeg.removeEventListener("click", selectTargetPeg);
      prevGuessPeg.removeEventListener("click", handleSelected);
      prevGuessPeg.style.border = "transparent";
      prevGuessPeg.classList.remove("selected");
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
let closeModalBtn = document.getElementById("closeModalBtn");

rulesBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
