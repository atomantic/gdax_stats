const config = require('../config')
const log = require('./log')
const market = require('./mem.market')
const fixNumber = require('./fix.number')
const fixString = require('./fix.string')
const service = require('./gdax.client')

module.exports = function(type, cb){
  service[type].getProductTicker(function(err, res, data){
    if(err){
      return log.warn(err)
    }
    const price = Number(data.price)
    market[type].ask = Number(data.ask)
    market[type].bid = Number(data.bid)
    market[type].median = fixNumber((market[type].ask + market[type].bid) / 2, 2)
    market[type].spread = fixNumber(market[type].ask - market[type].bid, 2)
    market[type].price = fixNumber(price)
    log.time(
      type+'💰 ',
      fixString(market[type].bid, 2),
      '<-',market[type].spread,
      '-> 🏷 ',
      fixString(market[type].ask, 2),
      'median:', market[type].median,
      'price:', market[type].price
    )
    if(cb) cb(err, market)
  })
}
