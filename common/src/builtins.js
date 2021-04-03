const Result = require('./result')
const immutable = require('immutable')
const tailcall = require('./tailcall')
const safety = require('./safety')
const memoize = require('./memoize')

function number(x) {
    if (typeof x == 'number') {
        return x
    }
    throw Error('Expected a number')
}

const generator = (obj) => {
    const gen = consumer => {
        for (let x of obj) {
            const r = consumer(x)
            if (r instanceof Result) {
                return r
            }
        }
    }
    gen.obj = obj
    return gen
}

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
    mod: (x, y) => number(x) % number(y),
    div: (x, y) => Math.trunc(number(x) / number(y)),
    '~': x => -number(x),
    '<=':  (x, y) => {
        if (typeof x === 'function') {
            if (x === y) {
                return true
            }
            if (x.obj && x.obj.equals) {
                return x.obj.equals(y.obj)
            }
            return false
        }
        return x <= y
    },
    '!': x => !x,
    '&': (x, y) => x & y,
    '|': (x, y) => x | y,
    'if': tailcall(3, args => args[0] ? [args[1], []] : [args[2], []]),
    'js-global': global || window,
    'js-get': (obj, key) => obj[key],
    'js-unwrap': o => (o && o.obj) || o,
    'js-wrap': obj => {
        if (obj instanceof immutable.Map) {
            const f = x => obj.get(x)
            f.obj = obj
            return f
        }
        if (obj instanceof immutable.Collection) {
            return generator(obj)
        }
        return obj
    },
    'js-call': (obj, method, args) => obj[method](...builtins['js-unwrap'](args)),
    num: s => {
        if (s.startsWith('+')) {
            s = s.substr(1)
        }
        switch (s.toLowerCase()) {
            case 'nan':
                return NaN
            case 'inf':
            case 'infinity':
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
    str: x => {
        const savedToString = Function.prototype.toString
        try {
            Function.prototype.toString = function () {
                return this.obj ? this.obj.toString() : 'λ'
            }
            return x + ''
        } finally {
            Function.prototype.toString = savedToString
        }
    },
    'num?': x => typeof x === 'number',
    'str?': x => typeof x === 'string',
    'fun?': x => typeof x === 'function',
    ',': (...args) => generator(immutable.List(args)),
    print: x => {
        safety.unsafe()
        console.log(builtins.str(x))
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
    record: gen => {
        if (gen.obj instanceof immutable.Map) {
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
        const fun = key => m.get(key)
        fun.obj = m
        return fun
    },
    ksys: gen => generator(gen.obj.keys()),
    list: gen => {
        if (gen.obj instanceof immutable.List) {
            return gen
        }
        let items = immutable.List()
        gen(x => {
            items = items.push(x)
        })
        return generator(items)
    },
    set: gen => {
        if (gen.obj instanceof immutable.Set) {
            return gen
        }
        let set = immutable.Set()
        gen(x => {
            set = set.add(x)
        })
        return generator(set)
    },
    union: (a, b) => generator(builtins.set(a).obj.union(builtins.set(b).obj)),
    intersect: (a, b) => generator(builtins.set(a).obj.intersect(builtins.set(b).obj)),
    size: gen => {
        if (gen.obj) {
            return gen.obj.size
        }
        let n = 0
        gen(x => n++)
        return n
    },
    at: (i, gen) => {
        if (gen.obj instanceof immutable.List) {
            return gen.obj.get(i)
        }
        const tag = {}
        let j = 0
        const result = gen(value => (j++ === i) && new Result(tag, value))
        if (result instanceof Result && result.tag === tag) {
            return result.value
        }
        return result
    },
    contains: (gen, item) => {
        if (gen.obj instanceof immutable.Collection) {
            return gen.obj.has(item)
        }
        const tag = {}
        const result = gen(value => (value === item) && new Result(tag, true))
        if (result instanceof Result && result.tag === tag) {
            return result.value
        }
        return false
    },
    concat: (g1, g2) => {
        if (g1.obj instanceof immutable.List && g2.obj instanceof immutable.List) {
            return generator(g1.obj.merge(g2.obj))
        }
        return c => {
            g1(c)
            g2(c)
        }
    },
    arity: f => (f === builtins[',']) ? null : f.length,
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
    safely: body => safety.safely(body),
    memoize,
    export: symbols => {
        throw Error('Illegal operation')
    },
    insert: (coll, index, value) => generator(coll.obj.insert(index, value)),
    update: (coll, index, value) => generator(immutable.update(coll.obj, index, value)),
    remove: (coll, index) => generator(immutable.remove(coll.obj, index)),
    join: (separator, gen) => {
        let s = ''
        gen(x => {
            if (s.length) {
                s += separator
            }
            s += x
        })
        return s
    },
    apply: (f, args) => f(...builtins.list(args))
}
builtins.__proto__ = null
builtins[','].variadic = true

module.exports = builtins