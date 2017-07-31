
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
