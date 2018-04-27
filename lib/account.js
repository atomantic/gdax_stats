const _ = require('lodash')
const client = require('./gdax.client')
const events = require('./events')
const log = require('./log')
const account = {
  balance: {
    usd: 0,
    usdAvailable: 0,
    btc: 0,
    btcAvailable: 0
  },
  load: function(cb) {
    log.action('loading GDAX accounts')
    client.private.getAccounts(function(err, res, data) {
      if(err) {
        log.fatal(err)
        return cb ? cb(err, data) : false
      }
      // console.log(data)
      const bch = _.find(data, {currency:'BCH'})
      const btc = _.find(data, {currency:'BTC'})
      const usd = _.find(data, {currency:'USD'})
      const eth = _.find(data, {currency:'ETH'})
      const ltc = _.find(data, {currency:'LTC'})
      account.bch_id = bch.id
      account.btc_id = btc.id
      account.usd_id = usd.id
      account.eth_id = eth.id
      account.ltc_id = ltc.id
      account.balance.bch = Number(bch.balance)
      account.balance.usd = Number(usd.balance)
      account.balance.btc =  Number(btc.balance)
      account.balance.eth =  Number(eth.balance)
      account.balance.ltc =  Number(ltc.balance)
      account.balance.usdAvailable = Number(usd.available)
      account.balance.bchAvailable = Number(bch.available)
      account.balance.btcAvailable = Number(btc.available)
      account.balance.ethAvailable = Number(eth.available)
      account.balance.ltcAvailable = Number(ltc.available)
      account.loaded = true
      events.emit('balance', account)
      // fire to clients
      log.success('accounts loaded')
      if(cb) cb(err, data)
    })
  },
  loaded: false
}

module.exports = account
