const Result = require('./result')
const immutable = require('immutable')
const tailcall = require('./tailcall')
const {isNode} = require("browser-or-node");
const {isBrowser} = require('browser-or-node')

function number(x) {
    if (typeof x == 'number') {
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
        const result = parseFloat(s.replaceAll('_', ''))
        if (Number.isNaN(result)) {
            throw Error('Invalid number format')
        }
        return result
    },
    'str': x => {
        const savedToString = Function.prototype.toString
        try {
            Function.prototype.toString = () => 'λ'
            return x + ''
        } finally {
            Function.prototype.toString = savedToString
        }
    },
    ',': (...args) => builtins.list(c => args.forEach(c)),
    'print': x => {
        if (isNode) {
            process.stdout.write(x)
        } else {
            console.log(x)
        }
    },
    'var': x => {
        const get = () => x
        const set = value => {
            return x = value
        }
        const result = m => {
            switch (m) {
                case 'get':
                    return get
                case 'let':
                    return set
                default:
                    throw Error('Illegal argument')
            }
        }
        result.toString = () => `<${x}>`
        return result
    },
    'throw': msg => {
        throw Error(msg)
    },
    'length': s => s.length,
    'substring': (s, from, length) => s.substr(from, length),
    'record': gen => {
        let m = immutable.OrderedMap()
        let isKey = true
        let key
        gen(x => {
            if (isKey) {
                key = x
            } else {
                m = m.set(key, x)
            }
            isKey = !isKey
        })
        const result = k => {
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
        result.object = m
        result.toString = () => m.toString().substr('OrderedMap '.length)
        return result
    },
    'list': gen => {
        let items = immutable.List()
        gen(x => {
            items = items.push(x)
        })
        const result = c => {
            for (let i of items) {
                const r = c(i)
                if (r instanceof Result) {
                    return r
                }
            }
            return null
        }
        result.object = items
        result.toString = () => items.toString().substr('List '.length)
        return result
    },
    'set': gen => {
        let set = immutable.Set()
        gen(x => {
            set = set.add(x)
        })
        const result = c => {
            for (let i of set) {
                const r = c(i)
                if (r instanceof Result) {
                    return r
                }
            }
            return null
        }
        result.object = set
        result.toString = () => set.toString().substr('Set '.length)
        return result
    },
    'size': gen => {
        if ('object' in gen) {
            return gen.object.size
        }
        let n = 0
        gen(x => n++)
        return n
    },
    'at': (i, gen) => {
        if ('object' in gen) {
            return gen.object.get(i)
        }
        const tag = {}
        let j = 0
        const result = gen(value => (j++ === i) && new Result(tag, value))
        if (result instanceof Result && result.tag === tag) {
            return result.value
        }
        return result
    },
    'concat': (g1, g2) => {
        const gen = c => {
            g1(c)
            g2(c)
        }
        if ('object' in g1 && 'object' in g2 && g1.object instanceof immutable.List && g2.object instanceof immutable.List) {
            gen.object = g1.object.merge(g2.object)
        }
    },
    'arity': f => f.length,
    'prompt': question => {
        if (isBrowser) {
            return prompt(question)
        } else {
            const forceSync = require('sync-rpc')
            const syncPrompt = forceSync(require.resolve('./prompt'))
            return syncPrompt(question)
        }
    }
}
builtins.__proto__ = null
builtins[','].variadic = true

module.exports = builtins