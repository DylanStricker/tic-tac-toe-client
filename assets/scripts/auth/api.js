'use strict'
const store = require('./../store')
const config = require('./../config')

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
  // console.log(store.user)
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
const gameStart = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    data: {},
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const playTurn = function (target, move) {
  // console.log(store.gameboard)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.gameboard.game._id,
    method: 'PATCH',
    data: {
      game: {
        cell: {
          index: target.dataset.index,
          value: function () {
            if (store.turn === false) { // is it x's turn?
              return 'x' // yes pass x
            } else {
              return 'o' // no pass o
            }
          }
        },

        over: function () {
          if (store.overStatus === false) {
            return store.overStatus
          } else {
            return store.overStatus
          }
        }
      }
    },
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}
const gameOver = function () {
  // console.log(store.gameboard)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.gameboard.game._id,
    method: 'PATCH',
    data: {
      game: {
        cell: {
          index: 1, // garbage values so it passes the api handler
          value: 'x' // shouldn't ever be used so it doesnt matter as long
        } // as they're accepted.
      },

      over: function () { // check if game is over.
        if (store.overStatus === false) { // is game over?
          return store.overStatus // no keep playing.
        } else {
          return store.overStatus // not false so it is over, stop game.
        }
      }
    },
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}
const gameCount = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}
module.exports = {
  signUp,
  signIn,
  pChange,
  signOut,
  gameStart,
  playTurn,
  gameOver,
  gameCount
}
