# Tic-Tac-Toe as an SPA #
Simple project I coded to run Tic-Tac-Toe in a SPA (Single Page Application.)
Simple set-up, makes AJAX API calls (not designed by me) to allow users to sign
up, sign-in, change password, and sign-out. The game works on a similar API that
POST requests to start a game, PATCHes it to update arrays of movement (x or o,)
move location (0-8, left-to-right, top-to-bottom;) and game's status as over or
not. The game count is listed making a GET request to determine total games
played (counting an array.) Everything is shown or hidden using .hide() and
.show(), simple css effects. Project took me 5 days to make work in a
functioning state, probably could have done it in 4 but I got burnt out by the
end of day 4.

### Tech Used #
 * HTML/CSS
 * Javascript
 * jQuery
 * Bootstrap
 * AJAX
 * General Assembly API interface

### API Documentation #
[tic-tac-toe A P I]https://git.generalassemb.ly/ga-wdi-boston/game-project-api

### Planning, Method, Organization #
 1. Created User Stories and Wire frames for outlining process.
 2. Started with API auth calls to allow for sign-in/up/out and PW change
 3. Made the board to play tic-tac-toe on and started building the response
 to a click made including the buttons involved.
 4. Added API event for the response to handle new game being made and turn made
 5. Made checks for game being won, game being tied
 6. Tidy up any further bugs.
### User Stories #

* I want to be able to sign up
* I want to be able to sign-in
* I want to be able to change my password
* I want to be able to sign-out
* As a new user, i want to start a new tic tac toe game
* As a new user, i want to rotate turn X and O, starting X
* As a new user, i want to only play valid spaces
* As a new user, i want to receive message for win/loss/tie
* As a new user, i want to end game after win no adding more to board
* As a new user, i want to be able to play again
* As a new user, i want to see how many games ive played

### Wireframes #
Pretty ugly but they do the job.
![WireFrame1]https://media.discordapp.net/attachments/476492229863800836/788430238744969287/WireFrame1.jpg?width=602&height=468

![WireFrame2]https://media.discordapp.net/attachments/476492229863800836/788430240787070986/WireFrame2.jpg?width=627&height=468

### Future Plans, Problems to solve #

 * Add nav-bar up top, move user api handlers to it.
 * Change how the game starts.
 * Track if the game is running or not.
 * Add ability to choose whose turn it is using a button, disable when game the
   game runs.
 * Style the page so it's not plain HTML anymore
 * Track the wins/losses -- hard to do might take a while / not happen.
