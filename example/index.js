var console = document.getElementById('console')

var log = function () {
  var args = Array.prototype.slice.call(arguments).map(function (arg) {
    if (typeof arg === 'object' && arg) return JSON.stringify(arg)
    else return String(arg)
  })

  console.value += `> ${args.join(' ')}\n`
}

document.addEventListener('deviceready', function () {
  var WifiManager = window.cordova.plugins.WifiManager

  WifiManager.onevent = function (name, data) {
    log('onevent', name, data)
  }

  WifiManager.isWifiEnabled(function (err, isEnabled) {
    log('isWifiEnabled', err, isEnabled)
  })
}, false)
