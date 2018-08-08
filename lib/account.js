const _ = require('lodash')
const client = require('./gdax.client')
const config = require('../config')
const events = require('./events')
const log = require('./log')
const account = {
  balance: {
  },
  load: function(cb) {
    log.action('loading GDAX accounts')
    client.private.getAccounts(function(err, res, data) {
      if(err) {
        log.fatal(err)
        return cb ? cb(err, data) : false
      }
      if(!_.find(data, {currency:'BTC'})){
        // GDAX error, didn't respond with error code
        return log.fatal('GDAX Error', data, ': Try Again... maybe mess with your timezone\n...This is a vexing error that I get sometimes early in the morning\n...not sure why yet')
      }
      _.each(config.currency, function(t){
        var tickerObj = _.find(data, {currency:t})
        var lowerT = t.toLowerCase()
        account[lowerT+'_id'] = tickerObj.id
        account.balance[lowerT] = Number(tickerObj.balance)
        account.balance[lowerT+'Available'] = Number(tickerObj.available)
      })
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
