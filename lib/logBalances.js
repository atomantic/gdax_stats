const config = require('../config')
const log = require('./log')
const account = require('./account')
const events = require('./events')
const market = require('./mem.market')
module.exports = function(){
  const b = account.balance
  const headersOffline = []
  const headersValues = []
  const widths = []
  const rowsOffline = [[]]
  const rowsValues = [[]]
  const rowsLiquid = [[]]
  var usdLiquid = 0

  config.currency.map(function(C){
    const USD = C==='USD'
    const fixLength = USD ? 2 : 8
    const c = C.toLowerCase()
    widths.push(USD ? 22 : 28)

    // online holding data
    const liquid = USD ? b[c] : (b[c] * market[c].price)
    usdLiquid += liquid
    const envCount = Number(process.env['EXT_'+C]||0)
    // add in hard wallets and tracking for any other external funds
    // to currency count
    b[c]+= envCount
    // add value of offline funds to liquid value
    const envValue = envCount * market[c].price
    usdLiquid += envValue
    headersOffline.push(
      C+'@ $'+(USD ? '1' : market[c].price)+' = $'+(envValue).toFixed(2)
    )
    rowsOffline[0].push(envCount)

    // online holding values data
    headersValues.push(
      C+'@ $'+(USD ? '1' : market[c].price)+' = $'+liquid.toFixed(2)
    )
    rowsValues[0].push(b[c+'Available'].toFixed(fixLength) +' / '+ b[c].toFixed(fixLength))
  })
  // have to run this loop again after we've populated usdLiquid
  config.currency.map(function(C){
    const USD = (C==='USD')
    const fixLength = USD ? 2 : 8
    // liquid values (what would we get if we liquidated everything into each currency)
    rowsLiquid[0].push( 
      USD ? usdLiquid.toFixed(2) : (usdLiquid / market[C.toLowerCase()].price).toFixed(fixLength)
    )
  })

  console.log('offline holdings:')
  log.table(
    headersOffline,
    widths,
    rowsOffline
  )
  console.log('$USD values:')
  log.table(
    headersValues,
    widths,
    rowsValues
  )
  console.log('Crypto liquid values:')
  log.table(
    config.currency,
    widths,
    rowsLiquid
  )
  console.log('Copy/Paste for Spreadsheet Tracking:')
  console.log(config.currency.map(c => '🏦 '+c).join('\t\t'))
  console.log(
    config.currency.map(c => b[c.toLowerCase()].toFixed(c==='USD'?2:8)).join('\t')
  )
  // liquid values
  console.log(config.currency.map(c => '💧 '+c).join('\t\t'))
  console.log(rowsLiquid[0].join('\t'))
  events.emit('logBalances')
}
