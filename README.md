# cordova-plugin-android-wifi-manager

Cordova plugin for accessing Android WifiManager.

## Usage

All the exposed methods and events have matching [WifiManager](https://developer.android.com/reference/android/net/wifi/WifiManager.html) counterparts.

```javascript
var WifiManager = cordova.plugins.WifiManager

WifiManager.onwifistatechanged = function (data) {
  console.log(data.previousWifiState, '->', data.wifiState)
}

// Turn on Wifi
WifiManager.setWifiEnabled(true, function (result) {
  console.log(result)
})
```
