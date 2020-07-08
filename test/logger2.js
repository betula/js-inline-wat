import logger2Bin from './logger2.wat.js'

var memory = new WebAssembly.Memory({ initial : 1 })

function consoleLogString(offset, length) {
  var bytes = new Uint8Array(memory.buffer, offset, length)
  var string = new TextDecoder('utf8').decode(bytes)
  console.log(string)
}

var importObject = {
  console: {
    log: consoleLogString
  },
  js: {
    mem: memory
  }
}

WebAssembly.instantiate(logger2Bin, importObject)
.then(obj => {
  obj.instance.exports.writeHi();
})
