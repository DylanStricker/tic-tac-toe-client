const store = require('./../store')

const onGameStartSuccess = function (responseData) {
  console.log(responseData)
  $('#board').show()
  console.log(store)
}

const onGameError = function (error) {
  console.log('your error is', error)
  $('#game-status').text('Something went Wrong')
}

module.export = {
  onGameError,
  onGameStartSuccess
}
