[Coinbase]: https://www.coinbase.com/join/antic

# GDAX Stats
is a tool for compiling the liquid value of a GDAX account and running reports for accounting against trade history using the GDAX API.
In order to use this tool, you will need to create an API key with "view" permissions (this is the only permission it needs): https://www.gdax.com/settings/api

If you don't yet have a GDAX trading account, you can sign up on [Coinbase][Coinbase], which uses the same account system as GDAX.

# Setup
* setup a [GDAX](https://www.gdax.com) account (Login with Coinbase)
* Get a [Coinbase GDAX][GDAX] API key/secret (view only, and restrict to your IP address)
* Set `GDAX_KEY`, `GDAX_SECRET`, `GDAX_PASS` as env vars
* Set external (offline wallet) numbers for `EXT_BTC`, `EXT_BCH`, `EXT_ETC`, `EXT_LTC`, `EXT_ETH`:
    * e.g. `export EXT_BTC=1` (if you have 1 BTC in an offline wallet or another exchange you want to track)
* install Node.js (recommend using [NVM](https://github.com/creationix/nvm) at latest version: 10.0.0)
* Install: `npm i -g gdax_stats`
* Run: `gdax_stats balance` to see balances

```
⚡️   \[._.]/ - getting balances
🕐   etc💰  NaN <- NaN -> 🏷  NaN median: NaN price: 0
🕑   ltc💰  67.01 <- 0.01 -> 🏷  67.02 median: 67.02 price: 67
🕒   bch💰  644.21 <- 0.01 -> 🏷  644.22 median: 644.22 price: 644
🕓   eth💰  377.30 <- 0.01 -> 🏷  377.31 median: 377.31 price: 377
🕔   btc💰  6590.77 <- 0.01 -> 🏷  6590.78 median: 6590.77 price: 6590
offline holdings:
┌───────────────────────┬──────────────────────┬─────────────────-─┬──────────────────────┐
│ BTC@ $9254.00 = $0.00 │ LTC@ $150.10 = $0.00 │ ETH@ $674 = $0.00 │ BCH@ $1379.79 = $0.0 │
├───────────────────────┼──────────────────────┼───────────────────┼──────────────────────┤
│ 0                     │ 0                    │ 0                 │ 0                    │
└───────────────────────┴──────────────────────┴───────────────────┴────────────────────-─┘
$USD values:
┌─────────────┬───────────────────-----─┬─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ USD = $0.00 │ BTC@ $9254 = $0.00      │ LTC@ $150 = $0.00       │ ETH@ $674 = $0.00       │ BCH@ $1380 = $0.00      │
├─────────────┼─────────────-───-----───┼─────────────────────────┼─────────────────────────┼───────────────---------─┤
│ 0.00 / 0.00 │ 0.00000000 / 0.00000000 │ 0.00000000 / 0.00000000 │ 0.00000000 / 0.00000000 │ 0.00000000 / 0.00000000 │
└─────────────┴─────────────────────────┴─────────────────────────┴─────────────────────────┴─────────────────────────┘
Crypto liquid values:
┌────────────┬────────────┬────────────┬────────────┬────────────┐
│ liquid USD │ liquid BTC │ liquid LTC │ liquid ETH │ liquid BCH │
├──────────-─┼─────────-──┼────────────┼────────────┼────────────┤
│ 0.00       │ 0.00000000 │ 0.00000000 │ 0.00000000 │ 0.00000000 │
└────────────┴────────────┴────────────┴────────────┴────────────┘
Copy/Paste for Spreadsheet Tracking:
USD Holdings	BTC Holdings	LTC Holdings	ETH Holdings	BCH Holdings	Liquid USD	Liquid BTC	Liquid LTC	Liquid ETH	Liquid BCH
0.00	        0.00000000	    0.00000000	    0.00000000	    0.00000000	    0.00	    0.00000000	0.00000000	0.00000000	0.00000000
```

## Author

Adam Eivy is a software architect by day and a drawing dad by night.
[follow him on the interwebs](http://adameivy.com)

![follow](https://img.shields.io/twitter/follow/antic.svg?style=social&label=Follow)

[![](https://www.coinbase.com/assets/buttons/donation_small-c2401ae30dd0ad6018deadfc4bb506bf56b5b7062738ee449bee97c4e80ec70c.png)](https://www.coinbase.com/checkouts/62b15a45f11194f8555884e200024616)
