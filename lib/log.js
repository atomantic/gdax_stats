const _ = require('lodash')
const argv = require('yargs').argv
const emoji = require('node-emoji')
const Table = require('cli-table')

const emojilog = function(icon, args, method) {
  console[method||'log'].apply(this, [emoji.get(icon), ' '].concat(args))
}
var time = 12
module.exports = {
  inspect: function() {
    emojilog('arrow_right', [].slice.call(arguments))
  },
  info: function() {
    emojilog('information_source', [].slice.call(arguments))
  },
  debug: function() {
    if(!argv.d){
      return
    }
    var args = [].slice.call(arguments)
    var icon = args.shift()
    emojilog(icon, args)
  },
  action: function() {
    emojilog('zap', [].slice.call(arguments))
  },
  cash: function() {
    emojilog('moneybag', [].slice.call(arguments))
  },
  change: function(){
    emojilog('twisted_rightwards_arrows', [].slice.call(arguments))
  },
  usd: function() {
    emojilog('heavy_dollar_sign', [].slice.call(arguments))
  },
  btc: function() {
    emojilog('chart', [].slice.call(arguments))
  },
  happy: function() {
    emojilog('smile', [].slice.call(arguments))
  },
  success: function() {
    emojilog('white_check_mark', [].slice.call(arguments))
  },
  warn: function() {
    emojilog('radioactive_sign', [].slice.call(arguments))
  },
  error: function() {
    emojilog('radioactive_sign', [].slice.call(arguments), 'error')
  },
  fatal: function() {
    emojilog('skull_and_crossbones', [].slice.call(arguments), 'error')
  },
  table: function(head, colWidths, rows){
    var table = new Table({
        style: {head: ['cyan']},
        head: head||['TH 1 label', 'TH 2 label']
      , colWidths: colWidths||[100, 200]
    })

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    _.forEach(rows, function(row){
      table.push(row)
    })

    console.log(table.toString())
  },
  time: function(){
    if(time===12){
      time = 0
    }
    time++
    emojilog('clock'+time, [].slice.call(arguments))
  }
}
