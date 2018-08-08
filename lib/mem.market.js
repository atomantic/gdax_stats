const _ = require('lodash')
const config = require('../config')
const market = {}
_.each(config.currency, function(c){
  market[c.toLowerCase()] = {
    ask: 0,
    bid: 0,
    price: 0,
    spread: 0
  }
})
module.exports = market
