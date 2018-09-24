var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen()
  , chalk = require('chalk')
//var markdown = contrib.markdown();
screen.title = 'Heaven - The tool for a modern developer'
// screen.append(markdown)
// markdown.setOptions({ firstHeading: chalk.red.italic })
// markdown.setMarkdown('# Hello \n This is **markdown** printed in the `terminal` 11')
var answerBox, list

function exit () {
  screen.destroy()
  process.exit(0)
}

screen.key(['C-c'], function (ch, key) {
  exit()
})

// Focus on `escape` or `i` when focus is on the screen.
// screen.key(['escape', 'i'], function () {
//   screen.remove(answerBox);
//   renderList()
// });

let listar = [
  {
    text: 'Chooseme',
    action: function () {console.log('TEST52')}
  },
  {
    text: 'Choose me 2',
    action: function () {console.log('TWo222')}
  }
]

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
  list.setItems(listar.map((e) => e.text))

  list.on('select', function (event) {
    listar[this.selected].action()
    //console.log()
    let text = listar[this.selected].text
    list.clearItems()
    // list.destroy()
    screen.remove(list)
    renderAnswer(text)
  })

  list.key([
    'space', 'o'
  ], function () {
    list.enterSelected()
    screen.render()
  })

  list.select(0)
  list.focus()
  screen.render();
}

function renderAnswer (text) {

  answerBox = blessed.box({
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    border: {
      type: 'line'
    },
    padding: 1,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      border: {
        bg: 'yellow'
      },
      bg: 'yellow'
    },
    keys: true,
    vi: true
    // mouse: true
  })

  answerBox.setContent(text)

  // answerBox.key([
  //   'escape', 'q'
  // ], function () {
  //   screen.remove(answerBox)
  //   screen.render()
  // })

  screen.append(answerBox)
  answerBox.focus()
  answerBox.key(['escape', 'i'], function () {
    console.log('test52')
    screen.remove(answerBox)
    renderList()
  })
  screen.render()
}

renderList()
