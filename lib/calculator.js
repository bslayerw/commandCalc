'use strict';

require('./extensions')

/**
 *
 *
 * @class CalcCommand
 */
class CalcCommand {
    constructor() {}
    execute() {}
}

/**
 *
 *
 * @class AdditionCommand
 * @extends {CalcCommand}
 */
class AdditionCommand extends CalcCommand {}

/**
 *
 *
 * @class SubtractionCommand
 * @extends {CalcCommand}
 */
class SubtractionCommand extends CalcCommand {}

/**
 *
 *
 * @class DivisionCommand
 * @extends {CalcCommand}
 */
class DivisionCommand extends CalcCommand {}

/**
 *
 *
 * @class MultiplyCommand
 * @extends {CalcCommand}
 */
class MultiplyCommand extends CalcCommand {}

/**
 *
 *
 * @class PowCommand
 * @extends {CalcCommand}
 */
class PowCommand extends CalcCommand {
    /**
     * Creates an instance of PowCommand.
     * @param {any} [exponent=-1]
     * @memberof PowCommand
     */
    constructor(exponent = -1) {
        super();
        this.exponent = exponent;
    }
}

class DeletePrevious extends CalcCommand {
    constructor(position = -1) {
        super();
        this.position = position;
    }
}

class QuitCommand extends CalcCommand {
    
}

const LEFT_ASSOCIATE = 0,
    RIGHT_ASSOCIATE = 1;

/**
 *
 *
 * @class Calculator
 */
class Calculator {

    constructor(height, width) {
        this.operators = {
            "^": {
                precedence: 4,
                associativity: RIGHT_ASSOCIATE
            },
            "/": {
                precedence: 3,
                associativity: LEFT_ASSOCIATE
            },
            "*": {
                precedence: 3,
                associativity: LEFT_ASSOCIATE
            },
            "+": {
                precedence: 2,
                associativity: LEFT_ASSOCIATE
            },
            "-": {
                precedence: 2,
                associativity: LEFT_ASSOCIATE
            }
        }
        this.operatorStack = new Array();
    }

    /**
     *
     *
     * @param {any} infix
     * @returns
     * @memberof Calculator
     */
    _infixToPostfix(infix) {
        console.log(`input ${infix}`)
        var outputQueue = "";
        var infix = infix.replace(/\s+/g, "");
        infix = infix
            .split(/([\+\-\*\/\^\(\)])/)
            .clean();
            console.log(`infix = ${infix}`)
        for (var i = 0; i < infix.length; i++) {
            var token = infix[i];
            if (token.isNumeric()) {
                outputQueue += token + " ";
            } else if ("^*/+-".indexOf(token) !== -1) {
                var o1 = token;
                var o2 = this
                    .operatorStack
                    .last();
                while ("^*/+-".indexOf(o2) !== -1 && ((this.operators[o1].associativity === LEFT_ASSOCIATE && this.operators[o1].precedence <= this.operators[o2].precedence) || (this.operators[o1].associativity === RIGHT_ASSOCIATE && this.operators[o1].precedence < this.operators[o2].precedence))) {
                    outputQueue += this
                        .operatorStack
                        .pop() + " ";
                    o2 = this
                        .operatorStack
                        .last();
                }
                this
                    .operatorStack
                    .push(o1);
            } else if (token === "(") {
                this
                    .operatorStack
                    .push(token);
            } else if (token === ")") {
                while (this.operatorStack.last() !== "(") {
                    outputQueue += this
                        .operatorStack
                        .pop() + " ";
                }
                this
                    .operatorStack
                    .pop();
            }
        }
        while (this.operatorStack.length > 0) {
            outputQueue += this
                .operatorStack
                .pop() + " ";
        }
        return outputQueue;
    }
}

module.exports = Calculator;
