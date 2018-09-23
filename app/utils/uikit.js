const CLI = require('clui')
const clc = require('cli-color')
const Spinner = CLI.Spinner
const Sparkline = CLI.Sparkline
const reqsPerSec = [10, 12, 3, 7, 12, 9, 23, 10, 9, 19, 16, 18, 12, 12]
const os = require('os')
const Line = CLI.Line,

  LineBuffer = CLI.LineBuffer

let outputBuffer = new LineBuffer({
  x: 0,
  y: 0,
  width: 'console',
  height: 'console'
})

let message = new Line(outputBuffer)
.column('Title Placehole', 20, [clc.green])
.fill()
.store()

let blankLine = new Line(outputBuffer)
.fill()
.store()

let header = new Line(outputBuffer)
.column('Suscipit', 20, [clc.cyan])
.column('Voluptatem', 20, [clc.cyan])
.column('Nesciunt', 20, [clc.cyan])
.column('Laudantium', 11, [clc.cyan])
.fill()
.store()

let line
for (let l = 0; l < 20; l++) {
  line = new Line(outputBuffer)
  .column((Math.random() * 100).toFixed(3), 20)
  .column((Math.random() * 100).toFixed(3), 20)
  .column((Math.random() * 100).toFixed(3), 20)
  .column((Math.random() * 100).toFixed(3), 11)
  .fill()
  .store()
}

outputBuffer.output()

let headers = new Line()
.padding(2)
.column('Column One', 20, [clc.cyan])
.column('Column Two', 20, [clc.cyan])
.column('Column Three', 20, [clc.cyan])
.column('Column Four', 20, [clc.cyan])
.fill()
.output()

let line2 = new Line()
.padding(2)
.column((Math.random() * 100).toFixed(3), 20)
.column((Math.random() * 100).toFixed(3), 20)
.column((Math.random() * 100).toFixed(3), 20)
.column((Math.random() * 100).toFixed(3), 20)
.fill()
.output()

let Gauge = CLI.Gauge

let total = os.totalmem()
let free = os.freemem()
let used = total - free
let human = Math.ceil(used / 1000000) + ' MB'

console.log(Gauge(used, total, 20, total * 0.8, human))

let Progress = CLI.Progress

let thisProgressBar = new Progress(20)
console.log(thisProgressBar.update(10, 30))

// or

let thisPercentBar = new Progress(20)
console.log(thisPercentBar.update(0.4))

let countdown = new Spinner('Exiting in 10 seconds...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])

countdown.start()

let number = 10
setInterval(function () {
  number--
  countdown.message('Exiting in ' + number + ' seconds...  ')
  if (number === 0) {
    process.stdout.write('\n')
    process.exit(0)
  }
}, 1000)
