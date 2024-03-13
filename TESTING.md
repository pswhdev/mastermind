# Mastermind -  Testing

## CONTENTS

<!-- Add contents list here -->

Testing was conducted continuously throughout the entire development. I have used Replit to test my logical functions before implementing thom on the code. I also used Chrome Developer Tools extensively during the building process to identify and address any issues.

The responsivness testing was conducted in different browsers, computers and mobile devices of different sizes and models to ensure the game can be played in diverse platforms.

Visit the deployed site: [Mastermind](https://pswhdev.github.io/mastermind/)


## AUTOMATED TESTING

## Responsiveness test

- Responsiveness tests were conducted manually by accessing the live website using different computer, browsers and mobile devices.

- The website is fully responsive, resizing the content of all pages according to the device's screen sizes, as can be seen in the images below.

    - The game page:
<!-- ![Responsive game](documentation/am-i-responsive-index.png) -->
    - Modal Instructions:
<!-- ![Responsive game](documentation/am-i-responsive-index.png) -->
    - Modal Win:

    - Modal Loose:


### W3C Validator

[W3C](https://validator.w3.org/) was used to validate the HTML on all pages of the website. It was also used to validate the CSS.

- - HTML:

  - No errors were returned when passing through the official W3C validator:

    <!-- - [Game Page](linkXXXXXXXXX) -->

- CSS:

  <!-- - No errors were found when passing through the official [(Jigsaw) validator](linkXXXXXXXXX) -->

### JavaScript Validator

[jshint](https://jshint.com/) was used to validate the JavaScript.

- [script.js](documentation/jshintresult.png) passed with a message indicating that one variable was not being used. The reason for this is that the variable represents a function utilized within an onclick attribute in the HTML file. This function is triggered by clicking a color. Given my current understanding, for this specific case, to incorporate the onclick attribute directly within the HTML code was the simplest approach I could have used, rather than separating it into an event listener within the JavaScript file.

### Lighthouse

The page was tested using the Lighthouse feature in Dev Tools from Google Chrome. The results can be seen in the pictures below. The picture with a black background show the results of tests conducted for the desktop version, whereas the ones with a white background show the results of tests for the mobile version:

- Home page:

<!-- ![Home page lh test desktop](xxxxxxxx link)

![Home page lh test mobile](xxxxxxxx link) -->


## MANUAL TESTING

### Testing User Stories
- Expectation:
As a player, I want to be able to easily find the instructions so that I can understand the game.
- Result:
The "Instructions" button is conveniently located beneath the gameboard, alongside the "Restart" and "Submit" buttons. Upon clicking this button, a popup window appears, presenting the instructions in a clear and concise manner.
- Expectation:
To be able to restart a new game at any time.
- Result:
The "Restart" button is situated beside the "Instructions" button. When clicked, it clears the entire game board, initiating a new game session without requiring a page refresh.
- Expectation:
To be able to easily select the colours I want to pick.
- Result:
The color palette is positioned adjacent to the gameboard, allowing users to select colors by directly clicking or touching their desired color.
- Expectation:
To be able to easily change the color of any peg before submitting, but after having chosen the colours of the current row.
- Result: To select a peg, simply click or touch the peg on the active row, which is distinguished by dark circles. This can be done regardless of whether a color has already been chosen for the peg. Moreover, you can change the color by selecting a different one from the color palette.
- Expectation: Understand the result keys after each round without having to check any other place.
- Result:
Below the gameboard, there is an easy-to-read guide explaining how to interpret the computed result keys, ensuring a clear understanding of the results.


### Full Testing

Full testing was performed on the following devices:

