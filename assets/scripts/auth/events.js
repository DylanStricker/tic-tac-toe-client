const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')
store.turn = false

const onSignUp = function (event) {
  event.preventDefault()
  console.log('SU clicked')

  const form = event.target

  const data = getFormFields(form)

  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onError)
}
const onSignIn = function (event) {
  event.preventDefault()
  console.log('SI clicked')

  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onError)
}
const onPChange = function (event) {
  event.preventDefault()
  console.log('PC clicked')
  const form = event.target

  const data = getFormFields(form)
  // console.log('haha', data)
  api.pChange(data)
    .then(ui.onPChangeSuccess)
    .catch(ui.onError)
}
const onSignOut = function (event) {
  event.preventDefault()
  console.log('SO clicked')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onError)
}

const onGameStart = function (event) {
  store.winStatus = false
  event.preventDefault()
  console.log('GS!')
  api.gameStart()
    .then(ui.onGameStartSuccess)
    .catch(ui.onGameError)
}

const playTurn = function (event) {
  console.log('turn', store.turn)
  const boardPositionId = event.target.id // grab ID
  event.target.dataset.index = boardPositionId
  store.pos = event.target
  console.log(store.gameboard.game.cells)
  if (store.gameboard.game.cells[boardPositionId] === '') {
    api.playTurn(event.target)
      .then(ui.onTurnMade)
      .catch(ui.onGameError)
  } else {
    console.log('no')
  }// | 0 | 1 | 2 |
} // | 3 | 4 | 5 |
// | 6 | 7 | 8 |

module.exports = {
  onSignUp,
  onSignIn,
  onPChange,
  onSignOut,
  onGameStart,
  playTurn

}
