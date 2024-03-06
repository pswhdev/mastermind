// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
  generateSecretCode();
});

// Out of the function so it is acessible to check function as well
let secretCode = [];
let arrOfPickedColors = [];

/**Function to generate the secret code (random colorpick) once the page is
 * loaded and upon completing or restarting the game
 * Note: It allows the same color to be chosen multiple times */
function generateSecretCode() {
  let colors = ["blue", "red", "orange", "pink", "green", "purple"];
  // let secretCode = [];
  for (i = 0; i < 4; i++) {
    secretCode.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  let code1 = document.getElementById("rowS-1");
  code1.style.backgroundColor = secretCode[0];
  let code2 = document.getElementById("rowS-2");
  code2.style.backgroundColor = secretCode[1];
  let code3 = document.getElementById("rowS-3");
  code3.style.backgroundColor = secretCode[2];
  let code4 = document.getElementById("rowS-4");
  code4.style.backgroundColor = secretCode[3];

  // return secretCode;
}

//When the user presses 'new game' a new code is generated and stored in an Array -- not working!!
let newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click", generateSecretCode);

//Mark the row the user should start clicking -- Still to be implemented

// Variables declared out of the fucntions so it can be accessed by other functions
let selectedColor = "";
let selectedColorArr = [];
let selectedTargetPegId = "";
let selectedColorObj = {};

function selectColor(color) {
  selectedColor = color;
  //console.log(selectedColor);
  changeColor();
}

function selectTargetPeg(event) {
  selectedTargetPegId = event.target.getAttribute("id");
  //console.log(selectedTargetPegId);
}

function changeColor() {
  if (selectedTargetPegId !== "" && selectedColor !== "") {
    let currentPeg = document.getElementById(selectedTargetPegId);
    currentPeg.style.backgroundColor = selectedColor;
    selectedColorObj[selectedTargetPegId] = selectedColor;
    //console.log(selectedColorObj);
  } else {
    alert("Please select a target peg.");
  }
}

//When the user is happy with the selection and ready to play, he clicks "play".
// After the user presses "Play" : check that all pegs colors on the current row have been chosen;
// Create the arrOfPickedColors
function createArrOfPickedColors() {
  let sortedIds = Object.keys(selectedColorObj).sort(); // Sorting id names (keys) alphabetically
  //console.log(sortedIds);
  for (let id of sortedIds) {
    let color = selectedColorObj[id];
    arrOfPickedColors.push(color);
  }
  // console.log(arrOfPickedColors);
  // console.log(secretCode);
  checkResult(secretCode, arrOfPickedColors);
}

// After results get computed:
//add onclick attibute to the next row and delete from the last played row
// mark the active row
//If what I am trying works --> after row 1 is finished I need to add attributes onclick="selectTargetPeg(event)" on the elements of row 2 with class r2
//this has to be changed everytime the active row changes
// let currentRow = document.querySelectorAll('.r1')
// console.log(currentRow)

let playButton = document.getElementById("play");
playButton.addEventListener("click", computeResult);

function computeResult() {
  // to stop user beign able to change pegs colors on played row
  selectedTargetPegId = "";
  //Count the amount of key-value pairs on the selectedColorObj to make sure the user picked a color for each peg
  let count = Object.keys(selectedColorObj).length;
  //console.log(count)
  if (count === 4) {
    createArrOfPickedColors();
  } else {
    alert("Please choose all your colors.");
  }
}

// variables created out of the fucntion to be acessible to all functions
let result = {};
let sumOfCorrect = 0;
let sumOfWrongPlace = 0;
// To check results
function checkResult(arr1, arr2) {
  // To keep track of which indexes were matched
  let checkedIndexes = [];
  // Check for
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
  console.log(result);
  giveUserFeedback();
  removeOnClicKAtt();
  moveActiveClass();
  
  //create function to remove active class from played row result pegs
  // if (sumOfCorrect === 4) {
  //   alert('Congratulations! You cracked the code!!')
  //   break;
  // } else if (){//consider the user reached the last row,in this case user looses. Else, continue on the next row. Add onclick attribute on them and active class on the result pegs

  // }
}

function moveActiveClass(){
  let currentActive = document.getElementById('resultRow1_1');
// Get the parent of the "active" div element
let activesParentEl = currentActive.parentNode;
// Get the grandparent of the div element
let ActivesGrandparentEl = activesParentEl.parentNode;
// Get the id of the grandparent div
let ActivesGrandparentId = ActivesGrandparentEl.id;
//console.log(ActivesGrandparentId)
//Turn id to number, add 1 to it and turn back to string
let nextRowsId = (parseInt(ActivesGrandparentId) + 1).toString();
//console.log(nextRowsId)
//To add the class "active" to the grandchildren (Result-Pegs) of the next row.
//First we need to get the parent div based in it's id
let nextRow = document.getElementById(nextRowsId);
console.log(nextRow);
//To find child div which is the parent of the divs we need to add the class of active to
let nextResultPanel = nextRow.querySelector('.result-panel');
//To get the grandchildren divs (result pegs) and add the class of active to them
let nextRowsResultPegs = nextResultPanel.querySelectorAll('.result-pegs');
console.log(nextRowsResultPegs)
for (let nextRowsResultPeg of nextRowsResultPegs) {
nextRowsResultPeg.classList.add('active');}

// To add the onclick attribute on the guess-pegs of the next row.
let nextGuessPegs = nextRow.querySelectorAll('.guess-pegs');
for(let nextGuessPeg of nextGuessPegs) {
nextGuessPeg.setAttribute('onclick', 'selectTargetPeg(event)');}
//console.log(nextGuessPeg);
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

function removeOnClicKAtt() {
  let elementsWithOnclick = document.querySelectorAll("[onclick].guess-pegs");
  for (let element of elementsWithOnclick) {
    element.removeAttribute("onclick");
  }
}
//Extend the function to either show result pegs and move to the next row OR finish the game (user won or reached the last row) and offering  the user to start again
//return { perfectMatch: sumOfCorrect, wrongPlace: sumOfWrongPlace };

//When the game is over make #rowS-result show message: Try again --> when clicked it starts a new game
//Or show message Win and shpw secret pegs OR open a modal to ask if the player wants to play again.

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
