//const argv = require('yargs').argv
const account = require('../lib/account')
const emoji = require('node-emoji')
const events = require('../lib/events')
const async = require('async')
const getTicker = require('../lib/get.ticker')
const log = require('../lib/log')
const logBalances = require('../lib/logBalances')

exports.command = 'balance'
exports.desc = emoji.get('scales') + '  balance'
exports.builder = {}
exports.handler = function () {
  log.action('\\[._.]/ - getting balances')
  async.parallel([
    function(cb){
      getTicker('btc', cb)
    },
    function(cb){
      getTicker('eth', cb)
    },
    function(cb){
      getTicker('ltc', cb)
    },
    function(cb){
      getTicker('bch', cb)
    }],
    function(err){
      if(err) throw err
      account.load()
      events.on('balance', logBalances)
      events.on('logBalances', function(){
        process.exit()
      })
  })
}
