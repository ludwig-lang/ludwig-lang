const FunctionObject = require("./FunctionObject");
const immutable = require("immutable");

class Record extends FunctionObject {
    constructor(gen) {
        super(1)

        let m = immutable.Map()
        let isKey = true
        let key
        gen(x => {
            if (isKey) {
                key = x
                if (key.obj) {
                    key = key.obj
                }
            } else {
                m = m.set(key, x)
            }
            isKey = !isKey
        })

        this.__map__ = m
    }

    __call__(key) {
        if (key.obj) {
            key = key.obj
        }
        const value = this.__map__.get(key)
        if (!value && !this.__map__.has(key)) {
            throw Error(`Unknown key ${key}`)
        }
        return value
    }

    toString() {
        if (this.__map__.has('to-string')) {
            return this.__map__.get('to-string')()
        }
        return this.__map__.toString();
    }
}

module.exports = Record