function selectItem (items, callback) {
  var blessed = require('blessed')
    , contrib = require('blessed-contrib')
    , screen = blessed.screen()
    , chalk = require('chalk')
  const clear = require('clear')

  screen.title = 'Heaven - The tool for a modern developer'
  let selectedItem = false
  var answerBox, list

  function exit () {
    screen.destroy()
    callback(selectedItem)
  }

  screen.key(['C-c'], function (ch, key) {
    exit()
  })

  function renderList () {
    list = blessed.list({
      parent: screen,
      width: '100%',
      height: '100%-1',
      top: 'center',
      left: 'center',
      align: 'center',
      fg: 'blue',
      border: {
        type: 'line'
      },
      selectedBg: 'green',
      padding: 1,

      // Allow mouse support
      mouse: true,
      title: 'Select Answer:',

      // Allow key support (arrow keys + enter)
      keys: true

      // Use vi built-in keys
      // vi: true
    })
    list.setItems(items.map((e) => e.text))

    list.on('select', function (event) {
      selectedItem = items[this.selected]
      screen.remove(list)
      list.clearItems()
      list.destroy()
      screen.destroy()
      exit()
    })

    list.focus()
    screen.render()
  }

  renderList()
}

module.exports = selectItem
