# Mastermind
Mastermind is a classic board game of deduction and strategy that has captivated players since its invention in the 1970s for its simplicity and yet depth of strategy. Created by Mordecai Meirowitz, Mastermind challenges players to crack a secret code composed of colored "pegs".

This Mastermind WebApp faithfully recreates the essence of the classic game. The player's objective is to deduce the exact sequence of colors within a limited number of turns to crack the code randomly created by the app.

Each turn, the player makes a guess by placing colored "pegs" in a row on the board. The app then provides feedback by placing smaller "pegs", called "key pegs",' next to the guess. These key "pegs" indicate how close the guess is to the secret code:
- A black key "peg" signifies a correct color in the correct position;
- A gray key "peg" indicates a correct color but in the wrong position;
- No key "peg" means that none of the guessed colors are in the secret code.

Through a process of logical deduction and elimination, the player refines their guesses, using the feedback from previous attempts to narrow down the possibilities. The game continues until the player successfully guesses the exact sequence or exhausts their allotted number of turns.

The player requires a combination of logical reasoning, pattern recognition, and a bit of luck to win the game.

This game is suitable to a wide range of players, from children acquiring fundamental deduction abilities to experienced strategists refining their mental agility.

![Responsive Mockup](documentation/mockup.png)

## CONTENTS

# Table of Contents
1. [Introduction](#mastermind)
   - [Contents](#contents)
2. [Features](#features)
   - [Existing Features](#existing-features)
   - [Features Left to Implement](#features-left-to-implement)
3. [User Experience (UX)](#user-experience-ux)
   - [User Stories](#user-stories)
4. [Design](#design)
   - [Color Scheme](#color-scheme)
   - [Typography](#typography)
   - [Imagery](#imagery)
   - [Wireframes](#wireframes)
5. [Technologies Used](#technologies-used)
   - [Languages Used](#languages-used)
   - [Frameworks, Libraries & Programs Used](#frameworks-libraries--programs-used)
6. [Deployment and Local deployment](#deployment-and-local-deployment)
   - [Deployment](#deployment)
   - [Local Development](#local-development)
7. [Testing](#testing)
8. [Fixed bugs](#fixed-bugs)
9. [Unfixed Bugs](#unfixed-bugs)
10. [Credits](#credits)
   - [Code Used](#code-used)
   - [Content](#content)
   - [Media](#media)
   - [Acknowledgments](#acknowledgments)



## Features 

### Existing Features

- __Color Palette__

  - Allows the player to choose the combination of colors to try to crack the secret color code generated by the app.
  - When playing on a computer, the colors scale up when the mouse hovers over them, making the color about to be chosen more evident for a better user experience (UX).
  - The colors are spaced apart sufficiently to prevent accidentally choosing the wrong color when playing the game on smaller devices such as smartphones or tablets.

![Color Palette](documentation/color_palette.png)

- __Secret Code Row__

  - The row containing the secret code is hidden behind question marks, enhancing the intuitive understanding for the player that the game revolves around discovering this hidden information.

![Secret row](documentation/secret_row.png)

- __Current Guess Row__

  - The current row being played is marked with dark rings improving visual clarity during gameplay progression.

![Current Guess Row](documentation/gameboard.png)

- __Current "Peg"__
  - The circles on the gameboard symbolizes the pegs from the classic game as seen from the top.

  - The selected "peg" (chosen manually by clicking or tapping, or automatically at the start of a new row or when selecting a color for the previous "peg") is slightly enlarged, ensuring clear visual distinction from the other "pegs" and aiding the player in identifying the "peg" they are coloring.
- This is how the row starts with the first "peg" automatically selected:
![Current "peg" automatically selected](documentation/current_peg_auto.png)
- It is possible to click or touch any other "peg" on the active row to select it as well. On the image below the third "peg" from left to right has been manually selected:
![Current "Peg" manually selected](documentation/current_peg_manual.png)

- __Result keys__ 

  - The result panel, displaying the computed keys, is aligned with the guess row for clear interpretation of the provided results. It consists of four small circles, symbolizing the little pegs used as keys in the classic game when viewed from above.

Result  keys on the right side of the gameboard showing the computed result: black for the number of colors on the matching the position on the secret code and gray for the number of colors present on the secret code, but on the wrong place:
![Result "pegs"](documentation/gameboard_win.png)

- __Keys Interpretation Panel__

  - A concise panel for interpreting keys is displayed on the screen, eliminating the need for players to refer to the instructions, which is particularly helpful for first-time players.

![Keys interpretation](documentation/result_keys.png)

- __Start New Game Button__

  - If the player wants to restart the game before finishing or after winning or losing, the "Start New Game" option clears all guesses and resets the game without requiring the page to be reloaded.

![Start New Game Button](documentation/start_button.png)


- __Instructions Button__

  - The player can easily access information on how to play the game by clicking the "Instructions" button, which opens a popup window containing the game rules.

![Instructions Button](documentation/instructions_btn.png)


Instructions Modal:
![Instructions Modal](documentation/modal_inst.png)

- __Try Again and Play again Game Buttons__

  - If the player wishes to restart the game immediately after winning or losing, the 'Try again' (if the player loses) or 'Play again' (if the player wins) button on the popup window restarts the game without requiring any further action or the page to be reloaded.

Try again:
![Try Again Game Button](documentation/modal_loose.png)

Play again:
![Play Again Game Button](documentation/modal_win.png)

- __Modals__

All modals can be closed either pressing the button "Close" at the end or on the top righ corner of the popup window.

__Cursor Pointer__

  - Cusror pointer has been used on button, "pegs" and colors for better UX

Example of pointer cursor:
![Pointer over color](documentation/pointer_example.png)


### Features Left to Implement

  - Choice of Difficulty:
    - The player can select between easy (with fewer color options or without color repetition), medium (the current game setup), and hard (with more colors to choose from or a code consisting of more than four colors).
  - Dark Mode:
    - The gameboard and theme transition to darker colors.
  - Colorblind Mode:
    - Utilizes a combination of colors from colorblind-friendly options, or alternatively, numbers could be used instead of colors for easier identification.
  - Game Accessibility Using the Keyboard:
    - Players can navigate the entire WebApp using keyboard keys to select colors and activate buttons.

## User Experience (UX)

### User Stories

  - As a player, I want to:
    - Be able to easily find the instructions so that I can understand the game.
    - Be able to restart a new game at any time.
    - Easily select the colors I want to pick.
    - Easily be able to change the color of any "peg" before submitting, but after having chosen the colors of the current row.
    - Understand the result keys after each round without having to check any other place.

## Design

### Color Scheme

- The game is inherently colorful, so I opted for a clean appearance for the game board, selecting a simple yet pleasant and joyful linear gradient for the background.
- Shadow effects were applied to the game elements to provide a sense of depth and enhance the user experience.

### Typography

Google Fonts were utilized to import the selected fonts for use on the website.

The title font, [Madimi One](https://fonts.google.com/?category=Serif,Display&query=Madimi+One) was selected for its distinctive, stylish, yet simple and readable characteristics.

For the other sections, including the instructions, the font chosen was [Barlow Condensed](https://fonts.google.com/?category=Serif,Display&query=Barlow+Condensed) for its concise and readable nature, even on small screens.

Madimi One example: 
![Madimi One Example](documentation/madimi_one.png)

Barlow Condensed example: 
![Barlow Condensed Display Example](documentation/barlow_condensed.png)

### Imagery

The FavIcon image features a colored "peg" from the classic game:

![FavIcon image](documentation/classic_peg_yellow.png)

### Wireframes

Wireframes were generated for both mobile and desktop versions utilizing Balsamiq. The layout remains consistent across all screens, adapting seamlessly to various screen sizes. Few changes were made during development, so the wireframes differ slightly from the final product.

![Wireframes](documentation/wireframes.png) 

## Technologies Used

### Languages Used

- HTML, CSS and JavaScript

### Frameworks, Libraries & Programs Used

- [Balsamiq](https://balsamiq.com/) - To create wireframes.

- [Replit](https://replit.com/) - To test my logic fucntions in JavaScript.

- [Github](https://github.com/) - To save and store the files for the website.

- [VSCode](https://code.visualstudio.com/) - To edit and save my code locally.

- [Google Fonts](https://fonts.google.com/) - To import the fonts used on the website.

- [Google Developer Tools](https://developers.google.com/web/tools) - To troubleshoot and test features, solve issues with responsiveness and styling.

- [Favicon.io](https://favicon.io/) To create favicon.

- [Am I Responsive?](http://ami.responsivedesign.is/) To diplay the website image on a range of devices.

- [Webpage Spell-Check](https://chrome.google.com/webstore/detail/webpage-spell-check/mgdhaoimpabdhmacaclbbjddhngchjik/related) - a google chrome extension that allows you to spell check your webpage. Used to check the site and the readme for spelling errors.


## Deployment and Local deployment:

### Deployment

- The site was deployed to GitHub pages. The steps taken to deploy were as follows: 
  - Log in (or sign up) to Github.
  - In the GitHub repository, navigate to the Settings tab 
  - Select pages in the left hand navigation menu.
  - From the source dropdown select main branch and press save.
  - The site has now been deployed, please note that this process may take a few minutes before the site goes live.
 

The live link can be found here - [Mastermind](https://pswhdev.github.io/mastermind/)

### Local Development

#### How to Fork

To fork the repository:

  - Log in (or sign up) to Github.
  - Go to the repository for this project, [pswhdev/Mastermind](https://github.com/pswhdev/mastermind)
  - Click the Fork button in the top right corner.

#### How to Clone

To clone the repository:

  - Log in (or sign up) to GitHub.
  - Go to the repository for this project, [pswhdev/Mastermind](https://github.com/pswhdev/mastermind)
  - Click on the code button, select whether you would like to clone with HTTPS, SSH or GitHub CLI and copy the link shown.
  - Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.
  - Type 'git clone' into the terminal and then paste the link you copied from the repository. Press enter.

## Testing

Please refer to [TESTING.md](TESTING.md) file for details on all testing conducted.

## Fixed bugs

During the test phase a few bugs were detected and corrected accordingly:

1. The random color generation method permits color repetition, leading to incorrect results when a player's guess includes the same color multiple times. For instance, if a color appears only once in the secret array and one of the repeated colors chosen by the player happens to be correctly placed during the comparison, that color is erroneously counted as many times as it occurred plus one in the result. 
To address this issue, I created a variable to keep track of all indexes had already been compared. For each element of the user's guess (arr2) that was not a perfect match, the fuction would search for its presence in the secret code (arr1) at different positions, checking the array of indexes that have been already checked, ensuring that the current position hasn't already been identified as a perfect match. This is descibed on the JavaScript code as a comment on the function checkResult(arr1, arr2) as well.

2. When the "Start New Game" button was pressed, the active row wasn't the first row, but rather the one that was last played before pressing the button. This issue was fixed by implementing a "resetGame" function to delete configurations saved on the last played "pegs".

3. When the game started with a page reload, only the "pegs" on the current row were clickable, which was the intended behavior. However, after losing or playing until a certain row and restarting with the "Start New Game" button, the "pegs" of the previously played rows did not lose the ".selected" class and could also be chosen to be played with. To fix this issue, I added reassignments for variables that stored values to reset them in the function that runs after clicking on "Submit".

4. The "pegs" on the previously played rows retained the selected class on them. To address this, I had to remove the event listener on the "moveToNextRow" function.

5. After winning, the color sequence was revealed, but the last played row remained active, and I could still press "Submit". Similarly, after losing, the same issue occurs, and I could still play. This issue was fixed by creating a "gameOver" function that removes attributes from the "guess pegs".

6. After cleaning up and restructuring the code, an issue arose where the first "peg" of the current row wouldn't hold the "selected" class attribute, which allows for visualization of the active "peg". To fix this, a thorough analysis of the entire code was conducted. It was discovered that the attribute was being added by one function but removed by setting some variables to clear upon moving to the next row. The fix was to move the function that handles the addition of the class attribute to the bottom of the tasks within the function that checks if the game proceeds after comparing the arrays. This ensured it was placed underneath the tasks that clear up the configurations on previous played "pegs".

## Unfixed Bugs

As of the current date of this documentation, to the best of my knowledge, there are no unresolved bugs.

## Credits

### Code Used

- I utilised code snippets from:
  - box-shadow from: https://www.cssmatic.com/box-shadow
suggested on https://stackoverflow.com/questions/54253830/give-divs-depth-with-css-box-shadow-property
  - https://uigradients.com/#KingYna for the background linear gradient.

- The solution to generate a random array of colors from a predefined array of colors was discovered and implemented from the following source: https://stackoverflow.com/questions/14949011/random-color-from-array


- I have intensively used the [W3Schools](https://www.w3schools.com/) to better understand JavaScript concepts and how to manipulate the DOM.

- I used this [this You Tube tutorial](https://www.youtube.com/watch?v=gLWIYk0Sd38) to create the modals.

### Content

The documentation in the README file was inspired by both the sample README files provided by Code Institute and the README files authored by Kera Cudmore for the thoroughness and clarity.

Text revisions were made with the assistance from ChatGPT.

### Media

- [FavIcon image](https://i.ebayimg.com/images/g/InMAAOSwnKxhiQ4e/s-l1600.jpg).

### Acknowledgments

I would like to express my gratitude to the following individuals:

- Jubril Akolade, my mentor, for providing invaluable guidance throughout the development process.
- Kera Cudmore, whose exemplary README files served as a model for the documentation included in this project.
- My husband, Josh Halley, for patiently and attentively listening to my ideas and problems I encountered at various stages of the development.
- My brother Rafael  Wyant for shedding light on a bug in my game towards the end of the development and assisting in finding the reason for the problem.
- My brother and my mother, Fernanda Soares, for their assistance with manual tests and for providing suggestions to enhance user-friendliness and necessary features.
