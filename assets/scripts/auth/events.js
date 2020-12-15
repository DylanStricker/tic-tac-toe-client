const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const onSignUp = function (event) {
  event.preventDefault()
  // console.log('SU clicked')

  const form = event.target

  const data = getFormFields(form)

  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onError)
}
const onSignIn = function (event) {
  event.preventDefault()
  // console.log('SI clicked')

  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onError)
}
const onPChange = function (event) {
  event.preventDefault()
  // console.log('PC clicked')
  const form = event.target

  const data = getFormFields(form)
  // console.log('haha', data)
  api.pChange(data)
    .then(ui.onPChangeSuccess)
    .catch(ui.onError)
}
const onSignOut = function (event) {
  event.preventDefault()
  store.gamestatus = true
  // console.log('SO clicked')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onError)
}
const gameClearOut = function () { // set all values set during the game to be empty or base
  store.turn = false
  store.gameboard = null
  store.pos = null
  store.overStatus = false
  store.totalTurn = 0
  store.winner = null
  $('.box').text('')
}
const onGameStart = function (event) {
  event.preventDefault()
  store.gamestatus = true
  // console.log('GS!')
  gameClearOut()
  api.gameStart()
    .then(ui.onGameStartSuccess)
    .then(gamesPlayed())
    .catch(ui.onGameError)
}
const switchPlayer = function (event) {
  event.preventDefault()
  store.turn = !store.turn
  ui.onPlayerChange()
}
const playTurn = function (event) {
  // console.log('turn', store.turn)
  if (store.gamestatus === true) {
    $('#game-started').hide()
    const boardPositionId = event.target.id // grab ID
    event.target.dataset.index = boardPositionId // store the clicked square's id
    store.pos = event.target // store the clicked tile WITH saved board id seperate
    // console.log(store.pos, 'store.pos')
    // console.log(store.gameboard.game.cells)
    if (store.gameboard.game.cells[boardPositionId] === '' && store.overStatus !== true) { // is the square empty? is the game over?
      store.totalTurn++ // increase turns played
      api.playTurn(event.target)
        .then(ui.onTurnMade)
        .catch(ui.onGameError)
    } else { // dont allow a move
      // console.log('no')
      $('#game-status').text('That spot is taken already')
    }
  } else {
    $('#game-status').text("The game hasn't started yet!")
  }
}
const gamesPlayed = function () {
  api.gameCount()
    .then(ui.onCountRequest)
    .catch(ui.onError)
}
module.exports = {
  onSignUp,
  onSignIn,
  onPChange,
  onSignOut,
  onGameStart,
  playTurn,
  gamesPlayed,
  switchPlayer

}
