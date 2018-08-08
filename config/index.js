module.exports = {
  heartbeat_timeout: 20000,
  env:{
    sand:{
      api: 'https://api-public.gdax.com',
      feed: 'wss://ws-feed-public.gdax.com',
      fix: 'https://fix-public.gdax.com'
    },
    prod: {
      api: 'https://api-public.sandbox.gdax.com',
      feed: 'wss://ws-feed-public.sandbox.gdax.com',
      fix: 'https://fix-public.sandbox.gdax.com'
    }
  },
  currency: ['USD', 'BCH', 'BTC', 'ETC', 'ETH', 'LTC']
}
