const capture = require('../utils/capture/input')

function selectItem (items, callback) {
  capture.prompt(items).then((answer) => {
    callback(answer)
  })
}

module.exports = selectItem
