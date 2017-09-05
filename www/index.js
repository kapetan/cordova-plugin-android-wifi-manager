var METHODS = [
  'addNetwork',
  'getConfiguredNetworks',
  'getConnectionInfo',
  'getDhcpInfo',
  'getWifiState',
  'isWifiEnabled',
  'isScanAlwaysAvailable',
  'setWifiEnabled'
]

var noop = function () {}
var slice = Array.prototype.slice

var exec = function (method, args, cb) {
  var onsucces = function () {
    var args = slice.call(arguments)
    args.unshift(null)
    cb.apply(null, args)
  }

  var onerror = function (err) {
    err = (err instanceof Error) ? err : new Error(err)
    cb(err)
  }

  window.cordova.exec(onsucces, onerror, 'WifiManagerPlugin', method, args || [])
}

var WifiManager = function () {
  this.onnetworkidschanged = null
  this.onnetworkstatechanged = null
  this.onrssichanged = null
  this.onscanresultsavailable = null
  this.onsupplicantconnectionchange = null
  this.onsupplicantstatechanged = null
  this.onwifistatechanged = null
  this.onevent = null
  this.onerror = null

  var self = this

  exec('onChange', null, function (err, result) {
    if (err) {
      if (self.onerror) self.onerror(err)
      return
    }

    var event = result.event.replace(/_/g, '').toLowerCase()
    var cb = self['on' + event]
    if (cb) cb.call(self, result.data)
    if (self.onevent) self.onevent(event, result.data)
  })
}

METHODS.forEach(function (method) {
  WifiManager.prototype[method] = function () {
    var args = slice.call(arguments)
    var cb = args[args.length - 1]
    if (typeof cb === 'function') args.pop()
    else cb = noop
    exec(method, args, cb)
  }
})

module.exports = new WifiManager()
