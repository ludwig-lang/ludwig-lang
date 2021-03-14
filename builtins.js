const rt = require('./rt')
const immutable = require('immutable')
const tailcall = require('./tailcall')
const {isBrowser} = require('browser-or-node')

function number(x) {
    if(typeof x == 'number') {
        return x
    }
    throw Error('Expected a number')
}

const builtins = {
    '+': (x, y) => number(x) + number(y),
    '-': (x, y) => number(x) - number(y),
    '*': (x, y) => number(x) * number(y),
    '/': (x, y) => number(x) / number(y),
    '~': x => -number(x),
    '<=': (x, y) => x <= y,
    'if': tailcall(3, args => args[0] ? [args[1], []] : [args[2], []]),
    'num': s => {
        if (s === 'NaN') {
            return NaN
        }
        const result = parseFloat(s)
        if (Number.isNaN(result)) {
            throw Error('Invalid number format')
        }
        return result
    },
    ',': (...args) => {
        const il = immutable.List(args)
        const result = c => {
            const r = il.forEach(c)
            if (r instanceof rt.Result) {
                return r
            }
        }
        result[rt.LIST] = il
        return result
    },
    'println': x => console.log(x) & null,
    'var': x => {
        const get = () => x
        const set = value => {
            return x = value
        }
        return m => {
            switch (m) {
                case 'get':
                    return get
                case 'let':
                    return set
                default:
                    throw Error('Illegal argument')
            }
        }
    },
    'throw': msg => {
        throw Error(msg)
    },
    'length': s => s.length,
    'substring': (s, from, length) => s.substr(from, length),
    'record': gen => {
        const m =  new Map()
        let isKey = true
        let key
        gen(x => {
            if (isKey) {
                key = x
            } else {
                m.set(key, x)
            }
            isKey = !isKey
        })
        return k => {
            const v = m.get(k)
            if (v === undefined) {
                if (!m.has(k)) {
                    if (!isKey) {
                        return key
                    }
                    throw Error('Illegal argument')
                }
            }
            return v
        }
    },
    'list': gen => {
        const items = []
        gen(x => items.push(x))
        const il = immutable.List(items)
        const result = c => {
            const r = il.forEach(c)
            if (r instanceof rt.Result) {
                return r
            }
        }
        result[rt.LIST] = il
        return result
    },
    'size': gen => {
        if (rt.LIST in gen) {
            return gen[rt.LIST].size
        }
        let n = 0
        gen(x => n++)
        return n
    },
    'at': (i, gen) => {
        if (rt.LIST in gen) {
            return gen[rt.LIST].get(i)
        }
        const tag = {}
        let j = 0
        const result = gen(value => (j++ === i) && new rt.Result(tag, value))
        if (result instanceof rt.Result && result.tag === tag) {
            return result.value
        }
        return result
    },
    'concat': (g1, g2) => {
        if (rt.LIST in g1 && rt.LIST in g2) {
            const gen = c => {
                g1(c)
                g2(c)
            }
            gen[rt.LIST] = g1[rt.LIST].merge(g2[rt.LIST])
        }
    },
    'arity': f => f.length,
    'prompt': question => {
        if (isBrowser) {
            return  prompt(question)
        } else {
            const forceSync = require('sync-rpc')
            const syncPrompt = forceSync(require.resolve('./prompt'))
            return syncPrompt(question)
        }
    }
}
builtins.__proto__ = null

module.exports = builtins