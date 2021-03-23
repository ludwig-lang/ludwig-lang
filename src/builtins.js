const Result = require('./result')
const immutable = require('immutable')
const tailcall = require('./tailcall')
const ordered = require('./ordered')
const {isBrowser, isNode} = require("browser-or-node");
const {ListWrapper, SetWrapper, MapWrapper} = require('./wrappers')

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
    '^': (x, y) => number(x) ** number(y),
    'mod': (x, y) => number(x) % number(y),
    'div': (x, y) => Math.trunc(number(x) / number(y)),
    '~': x => -number(x),
    '<=': ordered,
    '!': x => !x,
    '&': (x, y) => x & y,
    '|': (x, y) => x | y,
    'if': tailcall(3, args => args[0] ? [args[1], []] : [args[2], []]),
    'num': s => {
        switch (s.toLowerCase()) {
            case 'nan':
                return NaN
            case 'inf':
            case '+inf':
            case 'infinity':
            case '+infinity':
                return Infinity
            case '-inf':
            case '-infinity':
                return -Infinity
            default:
                const result = parseFloat(s.replaceAll('_', ''))
                if (Number.isNaN(result)) {
                    throw Error('Invalid number format')
                }
                return result
        }
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
    'exp': Math.exp,
    'log': Math.log,
    'sin': Math.sin,
    'cos': Math.cos,
    'tan': Math.tan,
    'asin': Math.asin,
    'acos': Math.acos,
    'atan': Math.atan,
    'atan2': Math.atan2,
    'floor': Math.floor,
    'ceil': Math.ceil,
    'sinh': Math.sinh,
    'cosh': Math.cosh,
    'tanh': Math.tanh,
    'asinh': Math.asinh,
    'acosh': Math.acosh,
    'atanh': Math.atanh,
    'sqrt': Math.sqrt,
    'num?': x => typeof x === 'number',
    'str?': x => typeof x === 'string',
    'fun?': x => typeof x === 'function',
    ',': (...args) => builtins.list(c => args.forEach(c)),
    'print': x => {
        if (isNode) {
            process.stdout.write(x)
        } else {
            console.log(x)
        }
    },
    'var': x => {
        const setter = value => {
            return x = value
        }
        const result = m => {
            switch (m) {
                case 'get':
                    return x
                case 'let':
                    return setter
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
        if (gen instanceof MapWrapper) {
            return gen
        }
        let m = immutable.Map()
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
        return new MapWrapper(m)
    },
    'list': gen => {
        if (gen instanceof ListWrapper) {
            return gen
        }
        let items = immutable.List()
        gen(x => {
            items = items.push(x)
        })
        return new ListWrapper(items)
    },
    'set': gen => {
        if (gen instanceof SetWrapper) {
            return gen
        }
        let set = immutable.Set()
        gen(x => {
            set = set.add(x)
        })
        return new SetWrapper(set)
    },
    'union': (a, b) => {
        if (!a instanceof SetWrapper || !b instanceof SetWrapper) {
            throw Error('Wrong argument types')
        }
        return new SetWrapper(a.object.union(b.object))
    },
    'intersect': (a, b) => {
        if (!a instanceof SetWrapper || !b instanceof SetWrapper) {
            throw Error('Wrong argument types')
        }
        return new SetWrapper(a.object.intersect(b.object))
    },
    'size': gen => {
        if ('size' in gen) {
            return gen.size
        }
        let n = 0
        gen(x => n++)
        return n
    },
    'at': (i, gen) => {
        if (gen instanceof ListWrapper) {
            return gen.get(i)
        }
        const tag = {}
        let j = 0
        const result = gen(value => (j++ === i) && new Result(tag, value))
        if (result instanceof Result && result.tag === tag) {
            return result.value
        }
        return result
    },
    'contains': (gen, item) => {
        if (gen.has) {
            return gen.has(item)
        }
        const tag = {}
        const result = gen(value => (value === item) && new Result(tag, true))
        if (result instanceof Result && result.tag === tag) {
            return result.value
        }
        return false
    },
    'concat': (g1, g2) => {
        if (g1 instanceof ListWrapper && g2 instanceof ListWrapper) {
            return new ListWrapper(g1.object.merge(g2.object))
        }
        return c => {
            g1(c)
            g2(c)
        }
    },
    'arity': f => (f === builtins[',']) ? null : f.length,
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