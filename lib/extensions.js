
Object.assign(String.prototype, {
  isNumeric () {
    return !isNaN(parseFloat(this)) && isFinite(this)
  }
})

Object.assign(Array.prototype, {
  last () {
    return this[this.length - 1]
  }
})
Object.assign(Array.prototype, {
  clean () {
    return this.filter(function (character) {
      return character !== ''
    })
  }
})

Object.assign(Array.prototype, {
  wrapSingleOperator (operators) {
    return this.map(function (elm) {
      const operatorIndex = operators.findIndex(function (operatorElm) {
        return elm.indexOf(operatorElm) !== -1
      })
      // if the value contains an operator wrap it with parantheses
      if (elm.isNumeric() && operatorIndex !== -1) {
        // this handles unary prefix operators for - & +
        return `(0${elm})`
      }
      return elm
    }).join('')
  }
})

Object.assign(Array.prototype, {
  first () {
    return this[0]
  }
})

Object.assign(String.prototype, {
  last () {
    return this[this.length - 1]
  }
})
Object.assign(String.prototype, {
  first () {
    return this[0]
  }
})
