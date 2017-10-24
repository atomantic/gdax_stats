[Coinbase]: https://www.coinbase.com/join/antic

# GDAX Stats
is a tool for compiling the liquid value of a GDAX account and running reports for accounting against trade history using the GDAX API.
In order to use this tool, you will need to create an API key with "view" permissions (this is the only permission it needs): https://www.gdax.com/settings/api

If you don't yet have a GDAX trading account, you can sign up on [Coinbase][Coinbase], which uses the same account system as GDAX.

# Setup
* Get a [Coinbase GDAX][Coinbase] API key/secret
* Set `GDAX_KEY`, `GDAX_SECRET`, `GDAX_PASS` as env vars
* setup a [GDAX](https://www.gdax.com) account (Login with Coinbase)
* install Node.js (recommend using [NVM](https://github.com/creationix/nvm))
* Install: `npm i -g gdax_stats`
* Run: `gdax_stats balance` to see balances

```
⚡️   \[._.]/ - getting balances
🕐   eth💰  310.80 <- 0.01 -> 🏷  310.81 median: 310.81 price: 311
🕑   btc💰  5717.00 <- 0.31 -> 🏷  5717.31 median: 5717.16 price: 5717
🕒   ltc💰  58.80 <- 0.01 -> 🏷  58.81 median: 58.8 price: 59
⚡️   loading GDAX accounts
┌────────-─┬─────────────────────────┬─────────────────────---─┬─────────────────────────┬───────────┐
│ USD = $0 │ BTC@ $5717 = $0.00      │ ETH@ $311 = $0.00       │ LTC@ $59 = $0.00        │ Liquid $  │
├────────-─┼───────────────────────-─┼─────────────────────---─┼─────────────────────────┼───────────┤
│ 0 / 0    │ 0.00000000 / 0.00000000 │ 0.00000000 / 0.00000000 │ 0.00000000 / 0.00000000 │ 0.00      │
└─────────-┴─────────────────────────┴──────────────────────--─┴─────────────────────────┴───────────┘
```

## Author

Adam Eivy is a software architect by day and a drawing dad by night.
[follow him on the interwebs](http://adameivy.com)

[![gratipay](https://img.shields.io/gratipay/antic.svg?style=flat)](https://gratipay.com/antic)

![follow](https://img.shields.io/twitter/follow/antic.svg?style=social&label=Follow)

[![](https://www.coinbase.com/assets/buttons/donation_small-c2401ae30dd0ad6018deadfc4bb506bf56b5b7062738ee449bee97c4e80ec70c.png)](https://www.coinbase.com/checkouts/62b15a45f11194f8555884e200024616)
