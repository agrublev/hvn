const checkPython = require('check-python')

module.exports = class simpleServer {
  async runSimpleServer () {
    const {exec} = require('child_process')
    checkPython(function (err, python, version) {
      console.log(python, version)
    })
    var child = exec('python -m SimpleHTTPServer 8000', {async: true})
    child.stdout.on('data', function (data) {
      console.log(data)
      /* ... do something with data ... */
    })
  }
}
