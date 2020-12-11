'use strict'
const events = require('./auth/events')
// const gEvents = require('./game/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#pass-change').on('submit', events.onPChange)
  $('#sign-out').on('click', events.onSignOut)
  $('#restart').on('click', events.onGameStart)
  $('.col-2').on('click', events.playTurn)
  $('.authenticated').hide()
  $('#board').hide()
  $('#gameEndModal').modal({ show: false })
})
