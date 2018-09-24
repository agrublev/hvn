var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen()

var pic = contrib.picture(
  { file: './freedcamp.png'
    , cols: 96
    , onReady: ready})
function ready() { screen.render() }

screen.append(pic)
