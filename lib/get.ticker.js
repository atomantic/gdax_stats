// const config = require('../config')
const log = require('./log')
const market = require('./mem.market')
const fixNumber = require('./fix.number')
const fixString = require('./fix.string')
const service = require('./gdax.client')
// const _ = require('lodash')

module.exports = function(type, cb){
  service[type].getProductTicker(function(err, res, data){
    if(err){
      return log.warn(err)
    }
    if(!data.price){
      log.info(err, data)
    }
    market[type].ask = Number(data.ask)
    market[type].bid = Number(data.bid)
    market[type].median = fixNumber((market[type].ask + market[type].bid) / 2, 2)
    market[type].spread = fixNumber(market[type].ask - market[type].bid, 2)
    market[type].price = data.price ? fixNumber(Number(data.price), 2) : 0
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
