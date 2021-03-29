const Result = require('./result')
const immutable = require('immutable')
const tailcall = require('./tailcall')
const ordered = require('./ordered')
const {isBrowser, isNode} = require("browser-or-node");
const safety = require('./safetty')
const memoize = require('./memoize')

function number(x) {
    if (typeof x == 'number') {
        return x
    }
    throw Error('Expected a number')
}

const callableObject = (func, obj) => {
    Object.assign(func, obj)
    Object.setPrototypeOf(func, Object.getPrototypeOf(obj))
    return func
}

const generator = (obj) => callableObject(consumer => {
    for (let x of obj) {
        consumer(x)
    }
}, obj)

const errorWrapper = e => key => {
    switch (key) {
        case 'message':
        case 'file':
        case 'line':
        case 'column':
            return e[key]
        default:
            throw Error('Invalid argument')
    }
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
                const result = JSON.parse(s.replaceAll('_', ''))
                if (typeof result !== 'number') {
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
    ',': (...args) => generator(immutable.List(args)),
    'print': x => {
        safety.unsafe()
        if (isNode) {
            process.stdout.write(x + '')
        } else {
            console.log(x)
        }
    },
    'var': x => {
        const gen = safety.generation()

        const setter = value => {
            if (gen < safety.generation()) {
                safety.unsafe()
            }
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
        if (gen instanceof immutable.Map) {
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
        return callableObject(key => m.get(key), m)
    },
    'list': gen => {
        if (gen instanceof immutable.List) {
            return gen
        }
        let items = immutable.List()
        gen(x => {
            items = items.push(x)
        })
        return generator(items)
    },
    'set': gen => {
        if (gen instanceof immutable.Set) {
            return gen
        }
        let set = immutable.Set()
        gen(x => {
            set = set.add(x)
        })
        return generator(set)
    },
    'union': (a, b) => generator(builtins.set(a).union(builtins.set(b))),
    'intersect': (a, b) => generator(builtins.set(a).intersect(builtins.set(b))),
    'size': gen => {
        if ('size' in gen) {
            return gen.size
        }
        let n = 0
        gen(x => n++)
        return n
    },
    'at': (i, gen) => {
        if (gen instanceof immutable.List) {
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
        if (gen instanceof immutable.Collection) {
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
        if (g1 instanceof immutable.List && g2 instanceof immutable.List) {
            return generator(g1.merge(g2))
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
    },
    'catch': tailcall(2, args => {
        try {
            const result = args[0]()
            return [() => result, []]
        } catch (e) {
            return [args[1], [errorWrapper(e)]]
        }
    }),
    'finally': (body, finalizer) => {
        try {
            return body()
        } finally {
            finalizer()
        }
    },
    'safely': body => safety.safely(body),
    'memoize': memoize,
    'inspect': symbol => {
        throw Error('Illegal operation')
    }
}
builtins.__proto__ = null
builtins[','].variadic = true

module.exports = builtins