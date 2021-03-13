class TailCallable extends Function {
    constructor(argCount, tc) {
        super(...Array(argCount).map(i => `_${i}`), 'return this.__self__.__call__(arguments)')
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
        return f(...args)
    }
}

module.exports = (argCount, tc) => new TailCallable(argCount, tc)