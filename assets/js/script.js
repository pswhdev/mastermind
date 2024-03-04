// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
      button.addEventListener("click", function() {
          if (this.getAttribute("data-type") === "start") {
            generateSecretCode();
          } else if
              (this.getAttribute("data-type") === "rules") {
              //Add modal with rules;
          } else if (this.getAttribute("data-type") === "play") {
            checkResult(arr1, arr2);
          }
      });
  }

  document.getElementById("play").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        checkResult(arr1, arr2);
      }
  });

  generateSecretCode();

});


/**Function to generate the secret code (random colorpick) once the page is
 * loaded and upon completing or restarting the game
 * Note: It allows the same color to be chosen multiple times */
function generateSecretCode() {
  let colors = ["blue", "red", "orange", "pink", "green", "purple"];
  let secretCode = [];
  for (i = 0; i < 4; i++) {
    secretCode.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  let code1 = document.getElementById('rowS-1');
  code1.style.backgroundColor = secretCode[0];
  let code2 = document.getElementById('rowS-2');
  code2.style.backgroundColor = secretCode[1];
  let code3 = document.getElementById('rowS-3');
  code3.style.backgroundColor = secretCode[2];
  let code4 = document.getElementById('rowS-4');
  code4.style.backgroundColor = secretCode[3];
  
  return secretCode;
}

//When the user presses 'new game' a new code is generated and stored in an Array
let newCode = generateSecretCode();

//Code for the background-color of the secretpegs will then be the new random generated colors

//User picks colors *****Change code so the colors are whatever color user picks"
let color1 = "red";
let color2 = "orange";
let color3 = "blue";
let color4 = "orange";
let arrOfPickedColors = [color1, color2, color3, color4];

//Create a function that once the user press play it generates random colors and changes the background-color of the secret code pegs

//Arrow appears showing what row the user should start clicking.

//When the user clicks on the peg on the appropriate row, he can pick a color;

//When the user is happy with the selection and ready to play, he clicks ok (or play).

// To check results
function checkResult(arr1, arr2) {
  let sumOfCorrect = 0;
  let sumOfWrongPlace = 0;
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
  }
//Extend the function to either show result pegs and move to the next row OR finish the game (user won or reached the last row) and offering  the user to start again
  return { perfectMatch: sumOfCorrect, wrongPlace: sumOfWrongPlace };
}

let result = checkResult(newCode, arrOfPickedColors);
console.log(result);
//Change the backgroung-color of the result-pegs:
//If the number of perfect match is 4 --> change background-color of the 4 result-pegs to black;
//If the number of perfect match is 3 and the number of existing color on the wrong position--> change background-color of the 3 result-pegs to black and one to white;

//When the game is over make #rowS-result show message: Try again --> when clicked it starts a new game
//Or show message Win and shpw secret pegs OR open a modal to ask if the player wants to play again.