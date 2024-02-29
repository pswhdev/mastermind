let secretCode = [];
let colours = ['blue', 'red', 'orange', 'pink', 'green', 'purple'];

//To generate the secret code (random colorpick). Note: It can add the same colour multiple times
function generateSecretCode(){
    for (i = 0; i < 4; i++) {
        secretCode.push(colours[Math.floor(Math.random() * 6)]);
      }
    return secretCode;
}

let newCode = generateSecretCode();

let secretOne = document.getElementById('rowS-1');

//Create a function that once the user press play it generates random colours and changes the background-color of the secret code pegs

//Arrow appears showing what row the user should start clicking.

//When the user clicks on the white peg on the appropriate row, he can pick a color;

//When the user is happy with the selection and ready to play, he clicks ok (or play).
//Create a function to compare the colours on each position with the secret code.
//Create two empty sums starting at 0: (same colour and same position) and (colour exists but not on that position);
//if the colour and position match push +1 to the sum of correct,  if colour exists but not on the same position (use index), add  1 to the sum of existing color  not on that position
//Change the backgroung-colour of the result-pegs:
//If the number of perfect match is 4 --> change background-colour of the 4 result-pegs to black;
//If the number of perfect match is 3 and the number of existing colour on the wrong position--> change background-colour of the 3 result-pegs to black and one to white;

// let newSecretOne = secretOne.style.backgroundColor(newCode[0])







