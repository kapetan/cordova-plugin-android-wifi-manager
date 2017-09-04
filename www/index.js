// module.exports = function (href, cb) {
//     var self = {
//       download: download,
//       onprogress: null,
//       ondownload: null,
//       oninstall: null,
//       onerror: null
//     }

//     return self

//     function download () {
//       var path = cordova.file.externalCacheDirectory + 'update.apk'
//       var fileTransfer = new window.FileTransfer()

//       if (self.onprogress) fileTransfer.onprogress = self.onprogress

//       // TODO: false should be true, otherwise it will download unsigned apps
//       fileTransfer.download(href, path, ondownload, onerror, false, {})
//     }

//     function ondownload (entry) {
//       if (self.ondownload) self.ondownload(entry)
//       install(entry)
//     }

//     function install (entry) {
//       cordova.exec(oninstall, onerror, 'SelfUpdate', 'Install', [entry.toURL()])
//     }

//     function oninstall (res) {
//       if (self.oninstall) self.oninstall(res)
//       cb(null, res)
//     }

//     function onerror (err) {
//       if (self.onerror) self.onerror(err)
//       return cb(err)
//     }
//   }

var WifiManager = function() {

};

WifiManager.prototype.exec = function(args, cb) {
  if(!cb && typeof args === 'function') {
    cb = args;
    args = null;
  }

  args = args || [];

  cordova.exec(cb, cb, 'WifiManagerPlugin', 'onNetworkChange', args);
};

module.exports = new WifiManager;
