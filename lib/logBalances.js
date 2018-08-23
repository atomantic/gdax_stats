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
    widths.push(USD ? 22 : 30)

    // offline holding data
    const liquid = USD ? b[c] : (b[c] * market[c].price)
    usdLiquid += liquid
    const envValue = Number(process.env['EXT_'+C]||0)
    // add in hard wallets and tracking for any other external funds
    b[c]+= envValue
    headersOffline.push(
      C+'@ $'+(USD ? '1' : market[c].price)+' = $'+(envValue*market[c].price).toFixed(2)
    )
    rowsOffline[0].push(envValue)

    // online holding values data
    headersValues.push(
      C+'@ $'+(USD ? '1' : market[c].price)+' = $'+liquid.toFixed(2)
    )
    rowsValues[0].push(b[c+'Available'].toFixed(fixLength) +' / '+ b[c].toFixed(fixLength))
  })
  // have to run this loop again after we've populated usdLiquid
  config.currency.map(function(C){
    const USD = C==='USD'
    const fixLength = USD ? 2 : 8
    const c = C.toLowerCase()
    // liquid values (what would we get if we liquidated everything into each currency)
    rowsLiquid[0].push( USD ? usdLiquid : (usdLiquid / market[c].price).toFixed(fixLength))
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
  console.log(
    config.currency.map(c => '🏦 '+c).join('\t') +'\t'+ config.currency.map(c => '💧 '+c).join('\t')
  )
  console.log(
    config.currency.map(c => b[c.toLowerCase()].toFixed(c==='USD'?2:8)).join('\t')
    +'\t'+
    rowsLiquid[0].join('\t')
  )
  events.emit('logBalances')
}
