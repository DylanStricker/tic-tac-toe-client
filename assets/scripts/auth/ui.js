'use strict'
const store = require('./../store')
const api = require('./api')

const onSignUpSuccess = function (responseData) {
  // console.log('user data', responseData)
  // console.log('success!')
  $('#current-status').text('Successfully signed up!')
  msgClearer('#current-status')
  $('form').trigger('reset')
}
const onSignInSuccess = function (responseData) {
  // console.log('user data', responseData)
  // console.log('success!')

  store.user = responseData.user
  $('#current-status').text('Successfully signed in!')
  msgClearer('#current-status')
  // hide unauthenticated
  $('.unauthenticated').hide()
  // show authenticated
  $('.authenticated').show()
  $('form').trigger('reset')
  api.gameCount()
    .then(onCountRequest)
    .catch(onError)
}

const onPChangeSuccess = function () {
  // console.log('success!')
  $('#current-status').text('Password Changed!')
  msgClearer('#current-status')
  $('form').trigger('reset')
}

const onSignOutSuccess = function () {
  // console.log('success!')
  $('#current-status').text('Signed Out!')
  msgClearer('#current-status')

  $('.authenticated').hide()
  $('.unauthenticated').show()

  // VERY IMPORTANT
  store.user = null
  $('form').trigger('reset')
}

const onError = function (error) {
  $('#current-status').text('error: ' + error.responseJSON.message)
  msgClearer('#current-status')
}

// gamers be like VVVVV

const onGameStartSuccess = function (responseData) {
  // console.log(responseData)
  store.gameboard = responseData // grab the new gameboard
  // console.log(store.gameboard)
  $('#board').show()
}

const onGameWon = function () {
  $('.modal-body').text(`${store.winner} wins the game!`)
  $('#gameEndModal').modal('show') // game end pop-up
}
const onTieGame = function () {
  $('.modal-body').text('Cat Won!')
  $('#gameEndModal').modal('show')
}
const onCountRequest = function (responseData) {
  // console.log(responseData, 'OCR!!!!!!!')
  store.games = responseData.games.length
  $('#game-tally').text(`You've Started ${store.games} Games!`)
}

const onTurnMade = function (responseData) {
  // console.log('OTM', responseData) // logs the new board data
  store.gameboard = responseData // save the updated gameboard from api into a variable
  // console.log('OTM', store.pos) // clicked tile spot
  const boardSpot = store.pos // save the clicked spot into a variable
  if (store.turn === false) { // is it x or o's turn?
    $(boardSpot).text(responseData.game.cells[store.pos.dataset.index]) // x goes in
  } else {
    $(boardSpot).text(responseData.game.cells[store.pos.dataset.index]) // o goes in
  }
  store.turn = !store.turn // set turn to opposite person's turn.
  if (((store.gameboard.game.cells[0] === store.gameboard.game.cells[1]) && (store.gameboard.game.cells[0] === store.gameboard.game.cells[2]) && (store.gameboard.game.cells[0] !== '')) || ((store.gameboard.game.cells[3] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[3] === store.gameboard.game.cells[5]) && (store.gameboard.game.cells[3] !== '')) || ((store.gameboard.game.cells[6] === store.gameboard.game.cells[7]) && (store.gameboard.game.cells[6] === store.gameboard.game.cells[8]) && (store.gameboard.game.cells[6] !== '')) || ((store.gameboard.game.cells[0] === store.gameboard.game.cells[3]) && (store.gameboard.game.cells[0] === store.gameboard.game.cells[6]) && (store.gameboard.game.cells[0] !== '')) || ((store.gameboard.game.cells[1] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[1] === store.gameboard.game.cells[7]) && (store.gameboard.game.cells[1] !== '')) || ((store.gameboard.game.cells[2] === store.gameboard.game.cells[5]) && (store.gameboard.game.cells[2] === store.gameboard.game.cells[8]) && (store.gameboard.game.cells[2] !== '')) || ((store.gameboard.game.cells[0] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[0] === store.gameboard.game.cells[8]) && (store.gameboard.game.cells[0] !== '')) || ((store.gameboard.game.cells[2] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[2] === store.gameboard.game.cells[6]) && (store.gameboard.game.cells[2] !== ''))) { // check if a game is won.
    store.winner = responseData.game.cells[store.pos.dataset.index].toUpperCase() // store the winner.
    // console.log('wow, game over')
    store.overStatus = true // mark the game as ended (win end)
    api.gameOver()
      .then(onGameWon)
      .catch(onGameError)
  } else if (store.totalTurn >= 9) { // check if 9 turns have been made.
    store.overStatus = true // mark the game as ended (tie end)
    api.gameOver()
      .then(onTieGame)
      .catch(onGameError)
  }
}

const onGameError = function (error) {
  // // console.log('your error is', error)
  $('#game-status').text('error: ' + error.responseJSON.message)
  msgClearer('#game-status')
}
function msgClearer (field) {
  const statusmsgclear = () => $(field).text('')
  setTimeout(statusmsgclear, 20000)
}
module.exports = {
  onError,
  onSignUpSuccess,
  onSignInSuccess,
  onPChangeSuccess,
  onSignOutSuccess,
  onGameStartSuccess,
  onGameError,
  onTurnMade,
  onCountRequest
}
