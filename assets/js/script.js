//To generate the secret code (random colorpick). Note: It can add the same color multiple times
function generateSecretCode() {
  let colors = ["blue", "red", "orange", "pink", "green", "purple"];
  let secretCode = [];
  for (i = 0; i < 4; i++) {
    secretCode.push(colors[Math.floor(Math.random() * 6)]);
  }
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

//When the user clicks on the white peg on the appropriate row, he can pick a color;

//When the user is happy with the selection and ready to play, he clicks ok (or play).
//Create a function to compare the colors on each position with the secret code.
//Create two empty sums starting at 0: (same color and same position) and (color exists but not on that position);
//if the color and position match push +1 to the sum of correct,  if color exists but not on the same position (use index), add  1 to the sum of existing color  not on that position

function checkResult(arr1, arr2) {
  let sumOfCorrect = 0;
  let sumOfWrongPlace = 0;
  // To check if the index position on the array with the secret has already been counted and avoid double counting the same item
  let ArrIndexOfWrongPlaceOnArr1 = [];
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      sumOfCorrect++;
      // To check if the index position on the array with the secret has already been counted and avoid double counting the same item
      ArrIndexOfWrongPlaceOnArr1.push(i);
    } else if (
      arr1.indexOf(arr2[i]) !== -1 &&
      // Change to if it is present on the array of indexes of wrong places, check if it appears again in another position (case: random is [ 'orange', 'purple', 'orange', 'pink' ] it only shows
      // Correct: 0
      // Wrong Place: 1
      // [ 0 ]
      // { perfectMatch: 0, wrongPlace: 1 })
      // To check if the index position on the array with the secret has already been counted and avoid double counting the same item
      !ArrIndexOfWrongPlaceOnArr1.includes(arr1.indexOf(arr2[i]))
    ) {
      sumOfWrongPlace++;
      // To check if the index position on the array with the secret has already been counted and avoid double counting the same item
      ArrIndexOfWrongPlaceOnArr1.push(arr1.indexOf(arr2[i]));
    }
  }
  console.log("Correct: " + sumOfCorrect);
  console.log("Wrong Place: " + sumOfWrongPlace);
  console.log(ArrIndexOfWrongPlaceOnArr1);
  return { perfectMatch: sumOfCorrect, wrongPlace: sumOfWrongPlace };
}

let result = checkResult(newCode, arrOfPickedColors);
console.log(result);

//Change the backgroung-color of the result-pegs:
//If the number of perfect match is 4 --> change background-color of the 4 result-pegs to black;
//If the number of perfect match is 3 and the number of existing color on the wrong position--> change background-color of the 3 result-pegs to black and one to white;

// let newSecretOne = secretOne.style.backgroundColor(newCode[0])
