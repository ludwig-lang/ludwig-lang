const Result = require('./result')
const builtins = require('./builtins')
const stdlib = require('./stdlib')
const tailcall = require('./tailcall')
const LudwigError = require("./LudwigError");


function error(file, line, column, message, cause = undefined) {
    throw new LudwigError(file, line, column, message, cause)
}

function parseTokens(tokens, filename) {
    const expressions = []
    let pos = 0

    while (pos < tokens.length) {
        let [newpos, expr] = parseExpression(tokens, pos, filename)
        expressions.push(expr)
        pos = newpos
    }

    return e => {
        let result = undefined
        expressions.forEach(expr => {
            result = expr(e)
        })
        return result
    }
}


function parseExpression(tokens, pos, filename) {
    const t = tokens[pos]
    if (t.value.startsWith('`')) {
        if (t.value.length < 2 || !t.value.endsWith('`')) {
            error(filename, t.line, t.column, 'Unterminated string literal')
        }
        const s = t.value.substr(1, t.value.length - 2)
        return [pos + 1, env => s]
    }
    if (t.value === '[') {
        if (++pos === tokens.length) {
            error(filename, t.line, t.column, 'Expected an expression')
        }

        if (tokens[pos].value === '=') {
            if (++pos === tokens.length) {
                error(filename, tokens[pos].line, tokens[pos].column, 'Expected a symbol')
            }
            const lhs = tokens[pos].value
            if (lhs.startsWith('`') || lhs === '=' || lhs === '\\' || lhs === '[' || lhs === ']') {
                error(filename, tokens[pos].line, tokens[pos].column, 'Expected a symbol')
            }
            if (pos === tokens.length - 1) {
                error(filename, tokens[pos].line, tokens[pos].column, 'Expected an expression')
            }
            const [newpos, rhs] = parseExpression(tokens, pos + 1, filename)
            expect(']', filename, newpos, tokens)
            return [newpos + 1, env => {
                if (Object.prototype.hasOwnProperty.call(env, lhs)) {
                    error(filename, tokens[pos].line, tokens[pos].column, `Symbol ${lhs} has been already defined`)
                }
                const value = rhs(env)
                env[lhs] = value
                return value
            }]
        }
        // lambda?
        if (tokens[pos].value === '\\') {
            expect('[', filename, pos + 1, tokens)
            const args = []
            let newpos = pos + 2
            while (newpos < tokens.length && tokens[newpos].value !== ']') {
                const arg = tokens[newpos].value
                if (arg in args) {
                    error(filename, tokens[newpos].line, tokens[newpos].column, `Duplicate argument name: '${arg}'`)
                }
                if (arg in ['=', '\\', '[', ']'] || arg.startsWith('`')) {
                    error(filename, tokens[newpos].line, tokens[newpos].column, `Illegal argument name: '${arg}'`)
                }
                args.push(arg)
                newpos++
            }
            expect(']', filename, newpos++, tokens)
            const body = []
            while (newpos < tokens.length && tokens[newpos].value !== ']') {
                let stmt
                [newpos, stmt] = parseExpression(tokens, newpos, filename)
                body.push(stmt)
            }
            expect(']', filename, newpos++, tokens)
            const factory = env => tailcall(args.length, (params) => {
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
                        return result
                    }
                }

                return body.length ? [body[body.length - 1], [e]] : [() => null, []]
            })

            return [newpos, factory]
        }
        // invocation
        let [newpos, head] = parseExpression(tokens, pos, filename)
        const args = []
        while (newpos < tokens.length && tokens[newpos].value !== ']') {
            let arg
            [newpos, arg] = parseExpression(tokens, newpos, filename)
            args.push(arg)
        }
        expect(']', filename, newpos, tokens)
        const line = t.line
        const column = t.column
        return [newpos + 1, tailcall(1, params =>  {
            const f = head(params[0])
            if (f === builtins.inspect) {
                const env = params[0]
                const symbol = args[0](env)
                const result = env[symbol]
                if (result === undefined) {
                    throw Error(`Unknown symbol ${symbol}`)
                }
                return [() => result, []]
            }
            return [f, args.map(a => a(params[0])), filename, line, column]
        })]
    }
    // symbol
    const symbol = t.value
    if (symbol === ']' || symbol === '=' || symbol === '\\') {
        error(filename, tokens[pos].line, tokens[pos].column, `Unexpected '${symbol}'`)
    }
    return [pos + 1, env => {
        const v = env[symbol]
        if (v === undefined && !(v in env)) {
            error(filename, tokens[pos].line, tokens[pos].column, `Unknown symbol: '${symbol}'`)
        }
        return v
    }]
}

function expect(token, filename, pos, tokens) {
    if (pos >= tokens.length) {
        error(filename, tokens[tokens.length - 1].line, tokens[tokens.length - 1].column, `Expected '${token}'`)
    }
    if (tokens[pos].value !== token) {
        error(filename, tokens[pos].line, tokens[pos].column, `Expected '${token}'`)
    }
}

const ludwig = {
    loaded: new Map(),

    tokenize(source, ignoreComments, ignoreWhitespace = true) {
        const tokens = []
        let line = 1
        let column = 0
        let pos = 0

        function token(pos, value) {
            return {pos, line, column, value}
        }

        while (pos < source.length) {
            let c = source[pos++]
            column++
            if (c.trim() === '') {
                if (c === '\n') {
                    line++
                    column = 0
                }
                if (!ignoreWhitespace) {
                    const start = pos - 1
                    while (pos < source.length && source[pos].trim() === '') {
                        pos++
                    }
                    tokens.push(token(start, source.substr(start, pos - start)))
                }
                continue
            }
            if (c === '[' || c === ']') {
                tokens.push(token(pos - 1, c))
                continue
            }
            if (c === '#') {
                const start = pos - 1
                while (pos < source.length && source[pos] !== '\n') {
                    pos++
                }
                if (!ignoreComments) {
                    tokens.push(token(start, source.substr(start, pos - start)))
                }
                continue
            }
            if (c === '`') {
                const start = pos - 1
                while (pos < source.length && source[pos] !== '`') {
                    pos++
                }
                tokens.push(token(start, source.substr(start, pos - start + 1)))
                column += pos - start
                pos++
                continue
            }
            const start = pos - 1
            while (pos < source.length && !/(\s|\[|]|`)/.test(source[pos])) {
                pos++
            }
            tokens.push(token(start, source.substr(start, pos - start)))

        }
        return tokens
    },

    parse(source, filename = 'code') {
        return parseTokens(this.tokenize(source, true), filename)
    },

    env() {
        return Object.create(builtins)
    },

    eval(source, filename = 'code', env = this.env()) {
        return this.parse(source, filename)(env)
    }
}

ludwig.eval(stdlib, 'stdlib', builtins)

module.exports = ludwig