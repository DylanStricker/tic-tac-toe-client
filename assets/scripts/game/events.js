const api = require('./api')
const ui = require('./ui')

const onGameStart = function (event) {
  event.preventDefault()
  console.log('GS!')
  api.gameStart()
    .then(ui.onGameStartSuccess)
    .catch(ui.onGameError)
}

module.export = {
  onGameStart
}
