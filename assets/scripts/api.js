'use strict'
const store = require('./store')
const config = require('./config')

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up/',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in/',
    method: 'POST',
    data
  })
}

const pChange = function (data) {
  console.log(store.user)
  return $.ajax({
    url: config.apiUrl + '/change-password/',
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}
const signOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  pChange,
  signOut
}
