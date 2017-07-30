# cmdcalc [![Build Status](https://travis-ci.org/bslayerw/commandCalc.png?branch=master)](https://travis-ci.org/bslayerw/commandCalc)[![Coverage Status](https://coveralls.io/repos/github/bslayerw/commandCalc/badge.svg?branch=master)](https://coveralls.io/github/bslayerw/commandCalc?branch=master)![Greenkeeper Status](https://badges.greenkeeper.io/bslayerw/COMMANDCALC.svg?style=flat-square)


## Command Line Calculator (Can't think of a fancier name and it probably doesn't matter :) )
Node.js command line interface that can evaluate mathematical expressions using a deriviate of the shunting-yard algorithm. This was done as an exercise and is only meant as an example.

## Prerequisites
[Node.js](https://nodejs.org/en/) - Testing only on v8.0.0+

## Installation

```sh
git clone https://github.com/bslayerw/commandCalc.git
cd commandCalc
npm install
```


## Tests

```sh
npm test
# run code coverage local and generate html in ./coverage
npm run test:coverage
```

## Run Interactive Shell

```sh
npm start
```

## Dependencies

- [babel-eslint](https://github.com/babel/babel-eslint): Custom parser for ESLint
- [bluebird](https://github.com/petkaantonov/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [chalk](https://github.com/chalk/chalk): Terminal string styling done right. Much color.
- [clear](https://github.com/bahamas10/node-clear): Clear the terminal screen if possible
- [clui](https://github.com/nathanpeck/clui): A Node.js toolkit for drawing nice command line tables, gauges, spinners, and sparklines.
- [commander](https://github.com/tj/commander.js): the complete solution for node.js command-line programs
- [figlet](https://github.com/patorjk/figlet.js): Creates ASCII Art from text. A full implementation of the FIGfont spec.
- [inquirer](https://github.com/SBoudrias/Inquirer.js): A collection of common interactive command line user interfaces.
- [lodash](https://github.com/lodash/lodash): Lodash modular utilities.
- [minimist](https://github.com/substack/minimist): parse argument options
- [ramda](https://github.com/ramda/ramda): A practical functional library for JavaScript programmers.

## Dev Dependencies

- [babel-cli](https://github.com/babel/babel/tree/master/packages): Babel command line.
- [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul): A babel plugin that adds istanbul instrumentation to ES6 code
- [babel-preset-env](https://github.com/babel/babel-preset-env): A Babel preset for each environment.
- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [coveralls](https://github.com/nickmerwin/node-coveralls): takes json-cov output into stdin and POSTs to coveralls.io
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [istanbul](https://github.com/gotwarlost/istanbul): Yet another JS code coverage tool that computes statement, line, function and branch coverage with module loader hooks to transparently add coverage when running tests. Supports all JS coverage use cases including unit tests, server side functional tests and browser tests. Built for scale
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [mocha-lcov-reporter](https://github.com/StevenLooman/mocha-lcov-reporter): LCOV reporter for Mocha
- [standard](https://github.com/feross/standard): JavaScript Standard Style


## Additional Resources
- Shunting-yard algorithm [Wikipedia](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
- Reference for Order of operator: [Wikipedia](https://en.wikipedia.org/wiki/Order_of_operations)
## License

MIT
