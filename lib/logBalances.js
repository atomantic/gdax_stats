const log = require('./log')
const account = require('./account')
const events = require('./events')
const market = require('./mem.market')
module.exports = function(){
  const b = account.balance
  // add in hard wallets and tracking for any other external funds
  b.btc += Number(process.env.EXT_BTC||0)
  b.bch += Number(process.env.EXT_BCH||0)
  b.ltc += Number(process.env.EXT_LTC||0)
  b.eth += Number(process.env.EXT_ETH||0)

  const bchUSDLiquid = (b.bch * market.bch.price)
  const btcUSDLiquid = (b.btc * market.btc.price)
  const ltcUSDLiquid = (b.ltc * market.ltc.price)
  const ethUSDLiquid = (b.eth * market.eth.price)
  const usdFixed = b.usd.toFixed(2)
  const usdLiquid = (b.usd + bchUSDLiquid + btcUSDLiquid + ltcUSDLiquid + ethUSDLiquid).toFixed(2)
  const ltcLiquid = (usdLiquid / market.ltc.price).toFixed(8)
  const btcLiquid = (usdLiquid / market.btc.price).toFixed(8)
  const ethLiquid = (usdLiquid / market.eth.price).toFixed(8)
  const bchLiquid = (usdLiquid / market.bch.price).toFixed(8)
  console.log('offline holdings:')
  log.table(
    [
      'BTC@ $'+market.btc.price+' = $'+btcUSDLiquid.toFixed(2),
      'LTC@ $'+market.ltc.price+' = $'+ltcUSDLiquid.toFixed(2),
      'ETH@ $'+market.eth.price+' = $'+ethUSDLiquid.toFixed(2),
      'BCH@ $'+market.bch.price+' = $'+bchUSDLiquid.toFixed(2),
    ],
    [32,    32,    32,    32],
    [[
      process.env.EXT_BTC||0,
      process.env.EXT_LTC||0,
      process.env.EXT_ETH||0,
      process.env.EXT_BCH||0
    ]]
  )
  console.log('$USD values:')
  log.table(
    [
      'USD = $'+usdFixed,
      'BTC@ $'+market.btc.price+' = $'+btcUSDLiquid.toFixed(2),
      'LTC@ $'+market.ltc.price+' = $'+ltcUSDLiquid.toFixed(2),
      'ETH@ $'+market.eth.price+' = $'+ethUSDLiquid.toFixed(2),
      'BCH@ $'+market.bch.price+' = $'+bchUSDLiquid.toFixed(2),
    ],
    [24,    32,    32,    32,    32],
    [[
      b.usdAvailable.toFixed(2) +' / '+ usdFixed,
      b.btcAvailable.toFixed(8) +' / '+ b.btc.toFixed(8),
      b.ltcAvailable.toFixed(8) +' / '+ b.ltc.toFixed(8),
      b.ethAvailable.toFixed(8) +' / '+ b.eth.toFixed(8),
      b.bchAvailable.toFixed(8) +' / '+ b.bch.toFixed(8)
    ]]
  )
  console.log('Crypto liquid values:')
  log.table(
    [
      'liquid USD',
      'liquid BTC',
      'liquid LTC',
      'liquid ETH',
      'liquid BCH'
    ],
    [24,    36,    34,    32,    32],
    [[
      usdLiquid,
      btcLiquid,
      ltcLiquid,
      ethLiquid,
      bchLiquid
    ]]
  )
  console.log('Copy/Paste for Spreadsheet Tracking:')
  console.log(
    'USD Holdings\tBTC Holdings\t\tLTC Holdings\tETH Holdings\tBCH Holdings\tLiquid USD\tLiquid BTC\tLiquid LTC\tLiquid ETH\tLiquid BCH')
  console.log(
    usdFixed +'\t'+ b.btc +'\t'+ b.ltc +'\t'+ b.eth +'\t'+ b.bch +'\t'+ 
    usdLiquid +'\t'+  btcLiquid +'\t'+  ltcLiquid +'\t'+ ethLiquid+'\t'+ bchLiquid)
  events.emit('logBalances')
}
