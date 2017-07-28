#!/usr/bin/env node
// allow all console logging
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

// -g ES6-compliant code
'use strict'

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const program = require('commander')
const inquirer = require('inquirer')
const Promise = require('bluebird')

const packageInfo = require('./package.json')
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

const calculator = new Calculator()

let questions = [
  {
    type: 'input',
    name: 'expression_to_eval',
    message: 'Enter an expression to evaluated. End with "=" to evaluate and store the result:'
  }
]

let expressionBuffer = ''

var evaluator = Promise.method(function () {
  return inquirer.prompt(questions).then(function (answer) {
    console.log(`answer = ${answer}`)
    if (answer.expression_to_eval.indexOf('Q') !== -1) {
      return {shouldQuit: true, evaluatedExpression: ''}
    }
    if (answer.expression_to_eval.indexOf('=') !== -1) {
      // append to the expression buffer instead of evaluting. Only evaluate when have the entire expression
      expressionBuffer += answer.expression_to_eval
      return {shouldQuit: false, evaluatedExpression: expressionBuffer}
    }
    const evaled = calculator.evaluate(answer.expression_to_eval)
    console.log(`answer ${evaled}`)
    return {shouldQuit: false, evaluatedExpression: evaled}
  })
})

function main () {
  return evaluator().then(function (result) {
    return result.shouldQuit ? result.evaluatedExpression : main()
  }).catch(function (err) {
    console.error(chalk.red(`somthing went wrong with input ${chalk.underline.bold.red(err)} !`))

    return main()
  })
}

main().then(function (data) {
  console.log(data)
})
