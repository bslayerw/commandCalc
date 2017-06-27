#!/usr/bin/env node

// specific the intrepret for running all globally if installed via npm install
// -g ES6-compliant code
'use strict';

const chalk = require('chalk');
const clear = require('clear');
const CLI = require('clui');
const figlet = require('figlet');
const inquirer = require('inquirer');
const Spinner = CLI.Spinner;
const _ = require('lodash');
const fs = require('fs');
const program = require('commander');
var packageInfo = require('./package.json');

const Calculator = require('./lib/calculator')

clear();
console.log(chalk.yellow(figlet.textSync('Cmd Calculator', {horizontalLayout: 'full'})));

program
    .version(packageInfo.version)
    .parse(process.argv); // end with parse to parse through the input

program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ custom-help --help');
    console.log('    $ custom-help -h');
    console.log('');
});
//console.log(`program options ${program}`)

const Calc = new Calculator();

console.log(`calc = ${Calc._infixToPostfix('3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3')}`);
