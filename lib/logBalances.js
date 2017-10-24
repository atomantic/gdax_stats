const log = require('./log')
const account = require('./account')
const events = require('./events')
const market = require('./mem.market')
module.exports = function(){
  const b = account.balance
  const btcLiquid = (b.btc*market.btc.price)
  const ltcLiquid = (b.ltc*market.ltc.price)
  const ethLiquid = (b.eth*market.eth.price)
  log.table(
    [
      'USD = $'+b.usd.toFixed(2),
      'BTC@ $'+market.btc.price+' = $'+btcLiquid.toFixed(2),
      'ETH@ $'+market.eth.price+' = $'+ethLiquid.toFixed(2),
      'LTC@ $'+market.ltc.price+' = $'+ltcLiquid.toFixed(2),
      'Liquid $'
    ],
    [24,    36,    34,    32,    16],
    [[
      b.usdAvailable.toFixed(2) +' / '+ b.usd.toFixed(2),
      b.btcAvailable +' / '+ b.btc,
      b.ethAvailable +' / '+ b.eth,
      b.ltcAvailable +' / '+ b.ltc,
      (b.usd + btcLiquid + ltcLiquid + ethLiquid).toFixed(2)
    ]]
  )
  events.emit('logBalances')
}
