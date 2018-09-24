const checkPython = require('check-python')

module.exports = class run {
  async runSimpleServer() {
    const {exec} = require('child_process');
    checkPython(function (err, python, version) {
      console.log(python, version);
    })
    var child = exec('python -m SimpleHTTPServer 8000', {async: true})
    child.stdout.on('data', function (data) {
      console.log(data)
    })
    exec('gulp', function (code, stdout, stderr) {
      console.log('Exit code:', code)
      console.log('Program output:', stdout)
      console.log('Program stderr:', stderr)
    })

  }
}
