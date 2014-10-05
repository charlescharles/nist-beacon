# nist-beacon

This is a simple wrapper for the [NIST Beacon API](https://beacon.nist.gov/home). The NIST Beacon publishes 512 bits of randomness every 60 seconds.

## Installation

`npm install nist-beacon`

## Usage

```javascript
var beacon = require('nist-beacon')
var epochTime = 1412480000

beacon.currentRecord(epochTime, function (err, res) {
  // prints the beacon value closest to epochTime in 128 hex characters
  console.log(res)
})

beacon.lastRecord(function (err, res) {
  // prints the last-published beacon value
  console.log(res)
})
```
