#!/usr/bin/env node
// allow all console logging
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

// -g ES6-compliant code
'use strict'

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const program = require('commander')
var packageInfo = require('./package.json')

const Calculator = require('./lib/calculator')

clear()
console.log(
  chalk.yellow(figlet.textSync('Cmd Calculator', { horizontalLayout: 'full' }))
)

program.version(packageInfo.version).parse(process.argv) // end with parse to parse through the input

program.on('--help', function () {
  console.log('  Examples:')
  console.log('')
  console.log('    $ custom-help --help')
  console.log('    $ custom-help -h')
  console.log('')
})

const Calc = new Calculator()
new Promise(function (resolve) {
  var result = Calc.evaluate('(1 + 1) * 10')
  resolve(result)
}).then(function (result) {
  console.log(result)
})

var promise = []
for (var i = 0; i < 20; i++) {
  promise.push(
    new Promise(function (resolve) {
      var result = Calc.evaluate(`(1 + ${i}) * 10`)
      resolve(result)
    })
  )
}
Promise.all(promise).then(values => {
  console.log(values)
})
