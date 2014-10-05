var https = require('https')
  , xml2js = require('xml2js')

var BEACON_URL = 'https://beacon.nist.gov/rest/record/'

module.exports._retrieveRecord = function (url, cb) {
  https.get(url, function (res) {
    res.on('data', function (data) {
      var xml = data.toString()
      return exports._parseBeaconResponse(xml, cb)
    })
  }).on('error', function (e) {
    cb('Error retrieving record at ' + url)
  })
}

module.exports._parseBeaconResponse = function (xml, cb) {
  xml2js.parseString(xml, function (err, parsed) {
    if (err) {
      return cb(err)
    }
    if (!parsed || !parsed.record || !parsed.record.outputValue || !parsed.record.outputValue.length) {
      return cb('Error parsing response xml: ' + xml)
    }
    cb(null, parsed.record.outputValue[0])
  })
}

module.exports.currentRecord = function (epochTime, cb) {
  if (!epochTime) {
    return cb('You must specify a timestamp to retrieve a current record.')
  }

  exports._retrieveRecord(BEACON_URL + epochTime, cb)
}

module.exports.previousRecord = function (epochTime, cb) {
  if (!epochTime) {
    return cb('You must specify a timestamp to retrieve the previous record.')
  }

  exports._retrieveRecord(BEACON_URL + '/previous/' + epochTime, cb)
}

module.exports.nextRecord = function (epochTime, cb) {
  if (!epochTime) {
    return cb('You must specify a timestamp to retrieve the next record.')
  }

  exports._retrieveRecord(BEACON_URL + '/next/' + epochTime, cb)
}

module.exports.lastRecord = function (cb) {
  exports._retrieveRecord(BEACON_URL + '/last', cb)
}

module.exports.startChainRecord = function (epochTime, cb) {
  if (!epochTime) {
    return cb('You must specify a timestamp to retrieve a chain record.')
  }
  exports._retrieveRecord(BEACON_URL + '/start-chain/' + epochTime, cb)
}

module.exports.lastRecord(function(){})
