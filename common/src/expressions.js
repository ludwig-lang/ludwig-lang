const Result = require('./result')
const LudwigError = require("./LudwigError")
const tailcall = require('./tailcall')
const immutable = require('immutable')
const builtins = require('./builtins')

const constant = value => env => value

const assignment = (lhs, rhs, filename, {line, column}) => env => {
    if (Object.prototype.hasOwnProperty.call(env, lhs)) {
        throw new LudwigError(filename, line, column, `Symbol ${lhs} has been already defined`)
    }
    const value = rhs(env)
    env[lhs] = value
    return value
}

const symbol = (name, filename, {line, column}) => env => {
    const v = env[name]
    if (v === undefined && !(name in env)) {
        throw new LudwigError(filename, line, column, `Unknown symbol: '${name}'`)
    }
    return v
}

const lambda = (args, body) => env => tailcall(args.length, (params) => {
    const e = Object.create(env)
    if (args.length !== params.length) {
        throw Error(`Expected ${args.length} arguments, got ${params.length}`)
    }
    for (let i = 0; i < args.length; i++) {
        e[args[i]] = params[i]
    }

    for (let i = 0; i < body.length - 1; i++) {
        let result = body[i](e)
        if (result instanceof Result) {
            return [() => result, []]
        }
    }

    return body.length ? [body[body.length - 1], [e]] : [() => null, []]
})

const invocation = (head, args, filename, {line, column}) => // env =>
    tailcall(1, params =>  {
        const f = head(params[0])
        if (f === builtins.export) {
            const env = params[0]
            const symbols = args[0](env)
            let m = immutable.Map()
            symbols(s => {
                m = m.set(s, env[s])
            })
            const fun = key => {
                const value = m.get(key)
                if (!value && !m.has(key)) {
                    throw Error('Unknown key')
                }
                return value
            }
            fun.obj = m
            return [() => fun, []]
        }
        return [f, args.map(a => a(params[0])), filename, line, column]
    })

module.exports = {constant, assignment, symbol, lambda, invocation}