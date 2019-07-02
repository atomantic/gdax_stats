const Gdax = require('gdax')
const _ = require('lodash')
const config = require('../config')
const gdaxClient = {
  // orderbookBTC: new Gdax.OrderbookSync('BTC-USD'),
  // orderbookLTC: new Gdax.OrderbookSync('LTC-USD'),
  // private calls (buy, sell, account info)
  private: new Gdax.AuthenticatedClient(
    process.env.GDAX_KEY,
    process.env.GDAX_SECRET,
    process.env.GDAX_PASS
  )
}
_.each(config.currency, function(currency){
  if(currency==='USD'){
    return;
  }
  const lowerCurrency = currency.toLowerCase()
  gdaxClient[lowerCurrency] = new Gdax.PublicClient(
    currency+'-USD' + (['zec','bat'].includes(lowerCurrency) ? 'C' : '')
  )
})
module.exports = gdaxClient
