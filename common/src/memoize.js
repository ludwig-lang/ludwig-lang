const immutable = require('immutable')
const FunctionObject = require('./FunctionObject')

class Memoized extends FunctionObject {
    constructor(fun) {
        super(fun.length)
        this.__fun__ = fun
        this.__cache__ = immutable.Map()
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