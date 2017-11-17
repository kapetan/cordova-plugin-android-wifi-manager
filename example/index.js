var textarea = document.getElementById('console')

var log = function () {
  console.log.apply(console, arguments)

  var args = Array.prototype.slice.call(arguments).map(function (arg) {
    if (arg instanceof Error) return `{Error: ${arg.message}}`;
    else if (typeof arg === 'object' && arg) return JSON.stringify(arg)
    else return String(arg)
  })

  textarea.value += `> ${args.join(' ')}\n`
}

var config = {
  SSID: `"Test AP"`,
  allowedAuthAlgorithms: {
    OPEN: true
  },
  allowedGroupCiphers: {
    CCMP: true,
    TKIP: true
  },
  allowedKeyManagement: {
    WPA_PSK: true
  },
  allowedPairwiseCiphers: {
    CCMP: true,
    TKIP: true
  },
  allowedProtocols: {
    RSN: true,
    WPA: true
  },
  status: 'ENABLED',
  preSharedKey: '"secret"'
}

document.addEventListener('deviceready', function () {
  var WifiManager = window.cordova.plugins.WifiManager

  WifiManager.onevent = function (name, data) {
    log('onevent', name, data)
  }

  // WifiManager.getWifiApConfiguration(function (err, config) {
  //   log('getWifiApConfiguration', err, config)
  // WifiManager.getWifiApState(function (err, state) {
  //   log('getWifiApState', err, state)

    WifiManager.setWifiApEnabled(config, true, function (err, result) {
      log('setWifiApConfiguration', err, result)
    })
  // })


  // WifiManager.isWifiEnabled(function (err, enabled) {
  //   log('isWifiEnabled', err, enabled)

  //   // WifiManager.setWifiApConfiguration(config, function (err, result) {
  //   //   log('setWifiApConfiguration', err, result)

  //     WifiManager.getWifiApConfiguration(function (err, config) {
  //       log('getWifiApConfiguration', err, config)

  //       WifiManager.getWifiApState(function (err, state) {
  //         log('getWifiApState', err, state)

  //         WifiManager.isWifiApEnabled(function (err, enabled) {
  //           log('isWifiApEnabled', err, enabled)

  //           WifiManager.setWifiApEnabled(config, true, function (err, result) {
  //             log('setWifiApEnabled', err, result)
  //           })
  //         })
  //       })
  //     })
  //   // })
  // })
}, false)
