const immutable = require('immutable')

const args = length => Array.from({length}, (_, i) => `_${i}` )

class Memoized extends Function {
    constructor(fun) {
        super(...args(fun.length), `return this.__self__.__call__([${args(fun.length)}])`)
        const self = this.bind(this)
        this.__self__ = self
        self.__fun__ = fun
        self.__cache__ = immutable.Map()
        return self
    }

    __call__(args) {
        const key = immutable.List(args)
        const cached = this.__cache__.get(key)
        if (cached) {
            return cached
        }
        const value = this.__fun__(...args)
        this.__cache__ = this.__cache__.set(key, value)
        return value
    }
}

module.exports = f => new Memoized(f)