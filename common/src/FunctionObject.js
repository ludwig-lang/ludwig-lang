const args = length => Array.from({length}, (_, i) => `_${i}` )

class FunctionObject extends Function{
    constructor(numArgs) {
        super(...args(numArgs), `return this.__self__.__call__([${args(numArgs)}])`)
        const self = this.bind(this)
        this.__self__ = self
        return self
    }
}

module.exports = FunctionObject