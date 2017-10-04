# cordova-plugin-android-wifi-manager

Cordova plugin for accessing Android WifiManager.

## Usage

Access the plugin after the device is ready, exposed at `window.cordova.plugins.WifiManager`.

```javascript
var WifiManager = cordova.plugins.WifiManager

WifiManager.onwifistatechanged = function (data) {
  console.log(data.previousWifiState, '->', data.wifiState)
}

// Turn on Wifi
WifiManager.setWifiEnabled(true, function (err, result) {
  console.log(err, result)
})
```

## API

All the exposed methods and events have matching [WifiManager](https://developer.android.com/reference/android/net/wifi/WifiManager.html) counterparts. The methods accept an optional callback as last argument, which is either called with an error object first, or with the value returned by the corresponding *Java* method.

#### `addNetwork(wifiConfiguration, cb(err, netId))`

Add a new network to the set of configured networks.

The method accepts a *JavaScript* object representing a [WifiConfiguration](https://developer.android.com/reference/android/net/wifi/WifiConfiguration.html) *Java* instance.

Note that the *Java* bitsets are represented as objects where the keys match the corresponding *WifiConfiguration* constants, e.g. `wifiConfiguration.allowedAuthAlgorithms.get(WifiConfiguration.AuthAlgorithm.LEAP)` maps to `wifiConfiguration.allowedAuthAlgorithms.LEAP` in `JavaScript`.

Example of a *WifiConfiguration* object.

```javascript
{
  BSSID: 'any',
  SSID: 'my-ssid',
  allowedAuthAlgorithms: {
    LEAP: true,
    OPEN: true,
    SHARED: true
  },
  allowedGroupCiphers: {
    CCMP: true,
    TKIP: true,
    WEP104: true,
    WEP40: true
  },
  allowedKeyManagement: {
    IEEE8021X: true,
    NONE: true,
    WPA_EAP: true,
    WPA_PSK: true
  },
  allowedPairwiseCiphers: {
    CCMP: true,
    NONE: true,
    TKIP: true
  },
  allowedProtocols: {
    RSN: true,
    WPA: true
  },
  hiddenSSID: false,
  networkId: 0,
  preSharedKey: 'psk',
  status: 'ENABLED',
  wepKeys: [
    null,
    null,
    null,
    null
  ],
  wepTxKeyIndex: 0
}
```

#### `disableNetwork(netId, callback(err, success))`

Disable a configured network.

#### `disconnect(callback(err, success))`

Disassociate from the currently active access point.

#### `enableNetwork(netId, attemptConnect, callback(err, success))`

Allow a previously configured network to be associated with.

#### `getConfiguredNetworks(callback(err, wifiConfigurations))`

Get a list of all configured networks. The callback recevies a list of *WifiConfiguration* objects.

#### `getConnectionInfo(callback(err, wifiInfo))`

Get information about the currently active WiFi connection. The callback receives a [WifiInfo](https://developer.android.com/reference/android/net/wifi/WifiInfo.html) object.

Example of a *WifiInfo* object.

```javascript
{
  BSSID: 'any',
  frequency: 2456,
  hiddenSSID: false,
  ipAddress: 2130706433,
  linkSpeed: 2300,
  macAddress: '00:14:22:01:23:45',
  networkId: 0,
  rssi: -15,
  SSID: 'my-ssid',
  supplicantState: 'COMPLETED'
}
```

#### `getDhcpInfo(callback(err, dhcpInfo))`

Get the assigned addresses from the last successfull DHCP request. The callback receives a [DhcpInfo](https://developer.android.com/reference/android/net/DhcpInfo.html) object.

Example of a *DhcpInfo* object.

```javascript
{
  dns1: 2130706433,
  dns2: 2130706434,
  gateway: 2130706433,
  ipAddress: 2130706433,
  leaseDuration: 60,
  netmask: 4278190080,
  serverAddress: 2130706433
}
```

#### `getScanResults(callback(err, scanResults))`

Get the results from the latest WiFi scan. The callback receives a list of [ScanResult](https://developer.android.com/reference/android/net/wifi/ScanResult.html) objects.

Example of a *ScanResult* object.

```javascript
{
  BSSID: 'any',
  SSID: 'my-ssid',
  capabilities: '[WPA2-PSK-CCMP]',
  centerFreq0: 80,
  centerFreq1: 80,
  channelWidth: '80MHZ',
  frequency: 2456,
  level: -15,
  timestamp: 1507117436782
}
```

#### `getWifiState(callback(err, wifiState))`

Get WiFi enabled state. Possible values are `DISABLED`, `DISABLING`, `ENABLED`, `ENABLING` and `UNKNOWN`.

#### `isScanAlwaysAvailable(callback(err, alwaysAvailable))`

Check if scanning is always available.

#### `isWifiEnabled(callback(err, wifiEnabled))`

Check if WiFi is either enabled or disabled.

#### `reassociate(callback(err, success))`

Reconnect to the currently active network, even if we already connected.

#### `reconnect(callback(err, success))`

Reconnect to the currently active network, if we are currently disconnected.

#### `removeNetwork(netId, callback(err, success))`

Remove a configured network.

#### `setWifiEnabled(enabled, callback(err, success))`

Enable or disable WiFi.

#### `startScan(callback(err, success))`

Request a scan for WiFi networks.

#### `updateNetwork(wifiConfiguration, callback(err, netId))`

Update an already configured network.
