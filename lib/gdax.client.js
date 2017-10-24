const Gdax = require('gdax')
module.exports = {
  // orderbookBTC: new Gdax.OrderbookSync('BTC-USD'),
  // orderbookLTC: new Gdax.OrderbookSync('LTC-USD'),
  // private calls (buy, sell, account info)
  private: new Gdax.AuthenticatedClient(
    process.env.GDAX_KEY,
    process.env.GDAX_SECRET,
    process.env.GDAX_PASS
  ),
  // public interfaces for ticker values, etc
  btc: new Gdax.PublicClient('BTC-USD'),
  eth: new Gdax.PublicClient('ETH-USD'),
  ltc: new Gdax.PublicClient('LTC-USD')
}
