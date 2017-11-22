var textarea = document.getElementById('console')

var log = function () {
  console.log.apply(console, arguments)

  var args = Array.prototype.slice.call(arguments).map(function (arg) {
    if (arg instanceof Error) return `{Error: ${arg.message}}`
    else if (typeof arg === 'object' && arg) return JSON.stringify(arg)
    else return String(arg)
  })

  textarea.value += `> ${args.join(' ')}\n`
}

document.addEventListener('deviceready', function () {
  var WifiManager = window.cordova.plugins.WifiManager

  WifiManager.onevent = function (name, data) {
    log('onevent', name, data)
  }

  WifiManager.isWifiEnabled(function (err, enabled) {
    log('isWifiEnabled', err, enabled)
  })
}, false)
