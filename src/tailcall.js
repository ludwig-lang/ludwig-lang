const LudwigError = require("./LudwigError");

function args(length) {
    return Array.from({length}, (_, i) => `_${i}` )
}

class TailCallable extends Function {
    constructor(argCount, tc) {
        super(...args(argCount), `return this.__self__.__call__([${args(argCount)}])`)
        const self = this.bind(this)
        this.__self__ = self
        self.__tail_call__ = tc
        return self
    }

    __call__(args) {
        let f = this
        let file = undefined
        let line = undefined
        let column = undefined
        try {
            while (f instanceof TailCallable) {
                [f, args, file, line, column] = f.__tail_call__(args)
            }
            if (typeof f !== 'function') {
                throw Error(`Expected a function but got a ${typeof f}`)
            }

            if (f.length !== args.length && !f.variadic) {
                throw Error(`Invalid number of arguments. Expected ${f.length} got ${args.length}.`)
            }

            const result = f(...args)
            return result !== undefined ? result : null
        } catch (e) {
            if (e instanceof LudwigError) {
                throw e
            }
            throw new LudwigError(file, line, column, e.message, e)
        }
    }
}

module.exports = (argCount, tc) => new TailCallable(argCount, tc)