#!/usr/bin/env node
var chalk = require('chalk')
require('yargs')
  .command(require('./commands/balance'))
  .demand(1)
  .option('d', {
    alias: 'debug',
    boolean: true,
    describe: 'enable debug logging'
  })
  .option('t', {
    alias: 'test',
    boolean: true,
    describe: 'test mode (no real trades)'
  })
  .usage('Usage: $0 ' + chalk.green('<command>') + ' '+ chalk.yellow('[options]'))
  .help()
  .version()
  .alias('h', 'help')
  .alias('v', 'version')
  .argv

// graceful failure handler
require('./lib/process')
