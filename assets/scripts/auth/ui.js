'use strict'
const store = require('./../store')
const api = require('./api')

const onSignUpSuccess = function (responseData) {
  console.log('user data', responseData)
  console.log('success!')
  $('#current-status').text('Successfully signed up!')
  $('form').trigger('reset')
}
const onSignInSuccess = function (responseData) {
  console.log('user data', responseData)
  console.log('success!')

  store.user = responseData.user

  $('#current-status').text('Successfully signed in!')
  // hide unauthenticated
  $('.unauthenticated').hide()
  // show authenticated
  $('.authenticated').show()
  $('form').trigger('reset')
}

const onPChangeSuccess = function () {
  console.log('success!')
  $('#current-status').text('Password Changed!')
  $('form').trigger('reset')
}

const onSignOutSuccess = function () {
  console.log('success!')
  $('#current-status').text('Signed Out!')

  $('.authenticated').hide()
  $('.unauthenticated').show()

  // VERY IMPORTANT
  store.user = null
  $('form').trigger('reset')
}

const onError = function (error) {
  console.log('your error is', error)
  $('#current-status').text('Something went wrong')
}

// gamers be like VVVVV

const onGameStartSuccess = function (responseData) {
  console.log(responseData)
  store.gameboard = responseData
  console.log(store.gameboard)
  $('#board').show()
}

const onGameWon = function () {
  $('#gameEndModal').modal('show')
  $('.modal-body').text(`${store.winner} wins the game!`)
}
const onTieGame = function () {
  $('.modal-body').text("It's a tie!")
  $('#gameEndModal').modal('show')
}

const onTurnMade = function (responseData) {
  console.log('OTM', responseData) // logs the board data
  store.gameboard = responseData
  console.log('OTM', store.pos) // clicked spot
  const boardSpot = store.pos
  if (store.turn === false) {
    $(boardSpot).text(responseData.game.cells[store.pos.dataset.index])
  } else {
    $(boardSpot).text(responseData.game.cells[store.pos.dataset.index])
  }
  store.turn = !store.turn
  if (((store.gameboard.game.cells[0] === store.gameboard.game.cells[1]) && (store.gameboard.game.cells[0] === store.gameboard.game.cells[2]) && (store.gameboard.game.cells[0] !== '')) || ((store.gameboard.game.cells[3] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[3] === store.gameboard.game.cells[5]) && (store.gameboard.game.cells[3] !== '')) || ((store.gameboard.game.cells[6] === store.gameboard.game.cells[7]) && (store.gameboard.game.cells[6] === store.gameboard.game.cells[8]) && (store.gameboard.game.cells[6] !== '')) || ((store.gameboard.game.cells[0] === store.gameboard.game.cells[3]) && (store.gameboard.game.cells[0] === store.gameboard.game.cells[6]) && (store.gameboard.game.cells[0] !== '')) || ((store.gameboard.game.cells[1] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[1] === store.gameboard.game.cells[7]) && (store.gameboard.game.cells[1] !== '')) || ((store.gameboard.game.cells[2] === store.gameboard.game.cells[5]) && (store.gameboard.game.cells[2] === store.gameboard.game.cells[8]) && (store.gameboard.game.cells[2] !== '')) || ((store.gameboard.game.cells[0] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[0] === store.gameboard.game.cells[8]) && (store.gameboard.game.cells[0] !== '')) || ((store.gameboard.game.cells[2] === store.gameboard.game.cells[4]) && (store.gameboard.game.cells[2] === store.gameboard.game.cells[6]) && (store.gameboard.game.cells[2] !== ''))) {
    store.winner = responseData.game.cells[store.pos.dataset.index].toUpperCase()
    console.log('wow, game over')
    store.overStatus = true
    api.gameOver()
      .then(onGameWon)
      .catch(onGameError)
  } else if (store.totalTurn === 9) {
    store.overStatus = true
    api.gameOver()
      .then(onTieGame)
      .catch(onGameError)
  }
}

const onGameError = function (error) {
  console.log('your error is', error)
  $('#game-status').text('Something went Wrong')
}

module.exports = {
  onError,
  onSignUpSuccess,
  onSignInSuccess,
  onPChangeSuccess,
  onSignOutSuccess,
  onGameStartSuccess,
  onGameError,
  onTurnMade
}
