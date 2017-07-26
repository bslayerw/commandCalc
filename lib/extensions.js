
String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

String.prototype.lastCharacter = function() {
    return this[this.length - 1];
}

Array.prototype.clean = function() {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === "") {
            this.splice(i, 1);
        }
    }
    return this;
}

Array.prototype.last = function() {
    return this[this.length - 1];
}