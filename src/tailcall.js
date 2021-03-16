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
        while(f instanceof TailCallable) {
            [f, args] = f.__tail_call__(args)
        }
        const result = f(...args)
        return result !== undefined ? result : null
    }
}

module.exports = (argCount, tc) => new TailCallable(argCount, tc)