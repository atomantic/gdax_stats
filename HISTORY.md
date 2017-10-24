# 1.0.0
  - `node . sync` - fetches historical market data from coinbase API and merges significant changes to `./data/history.json`
  - `node . sync -w --interval=30000` - continuously monitors market price every 30 seconds and appends new significant changes to `./data/history.json`
  - `node . sim` - uses configuration thresholds to simulate `buy` and `sell` actions using the `./data/history.json` events
