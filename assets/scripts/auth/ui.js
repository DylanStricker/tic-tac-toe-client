'use strict'
const store = require('./../store')

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
const onGameStartSuccess = function (responseData) {
  console.log(responseData)
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
  onGameError
}
