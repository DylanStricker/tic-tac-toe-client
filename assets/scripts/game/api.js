const config = require('./../config')
const gameStart = function (data) {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    data: {}
  })
}
module.export = {
  gameStart
}
