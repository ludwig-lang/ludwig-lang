const LudwigError = require('./LudwigError')
const expressions = require('./expressions')
const tokenize = require('./tokenize')

const parse = (source, filename = 'code') => parseTokens(tokenize(source, true), filename)

const parseTokens = (tokens, filename) => {
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

const parseExpression = (tokens, pos, filename) => {
    const t = tokens[pos]
    if (t.value.startsWith('`')) {
        return parseStringLiteral(t, filename, pos)
    }
    if (t.value === '[') {
        if (++pos === tokens.length) {
            throw new LudwigError(filename, t.line, t.column, 'Expected an expression')
        }
        if (tokens[pos].value === '=') {
            return parseAssignment(tokens, pos, filename)
        }
        if (tokens[pos].value === '\\') {
            return parseLambda(tokens, pos, filename)
        }
        return parseInvocation(tokens, pos, filename, t)
    }
    return parseSymbol(tokens, pos, filename, t)
}

const parseStringLiteral = (t, filename, pos) => {
    if (t.value.length < 2 || !t.value.endsWith('`')) {
        throw new LudwigError(filename, t.line, t.column, 'Unterminated string literal')
    }
    const s = t.value.substr(1, t.value.length - 2)
    return [pos + 1, expressions.constant(s)]
}

const parseAssignment = (tokens, pos, filename) => {
    if (++pos === tokens.length) {
        throw new LudwigError(filename, tokens[pos].line, tokens[pos].column, 'Expected a symbol')
    }
    const lhs = tokens[pos].value
    if (lhs.startsWith('`') || lhs === '=' || lhs === '\\' || lhs === '[' || lhs === ']') {
        throw new LudwigError(filename, tokens[pos].line, tokens[pos].column, 'Expected a symbol')
    }
    if (pos === tokens.length - 1) {
        throw new LudwigError(filename, tokens[pos].line, tokens[pos].column, 'Expected an expression')
    }
    const [newpos, rhs] = parseExpression(tokens, pos + 1, filename)
    expect(']', filename, newpos, tokens)
    return [newpos + 1, expressions.assignment(lhs, rhs, filename, tokens[pos])]
}

function parseLambda(tokens, pos, filename) {
    expect('[', filename, pos + 1, tokens)
    const args = []
    let newpos = pos + 2
    while (newpos < tokens.length && tokens[newpos].value !== ']') {
        const arg = tokens[newpos].value
        if (args.includes(arg)) {
            throw new LudwigError(filename, tokens[newpos].line, tokens[newpos].column, `Duplicate argument name: '${arg}'`)
        }
        if (['=', '\\', '[', ']'].includes(arg) || arg.startsWith('`')) {
            throw new LudwigError(filename, tokens[newpos].line, tokens[newpos].column, `Illegal argument name: '${arg}'`)
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
    return [newpos, expressions.lambda(args, body)]
}

const parseInvocation = (tokens, pos, filename, location) => {
    let [newpos, head] = parseExpression(tokens, pos, filename)
    const args = []
    while (newpos < tokens.length && tokens[newpos].value !== ']') {
        let arg
        [newpos, arg] = parseExpression(tokens, newpos, filename)
        args.push(arg)
    }
    expect(']', filename, newpos, tokens)
    return [newpos + 1, expressions.invocation(head, args, filename, location)]
}

const parseSymbol = (tokens, pos, filename, {line, column}) => {
    const symbol = tokens[pos].value
    if (symbol === ']' || symbol === '=' || symbol === '\\') {
        throw new LudwigError(filename, line, column, `Unexpected '${symbol}'`)
    }
    return [pos + 1, expressions.symbol(symbol, filename, {line, column})]
}

const expect = (token, filename, pos, tokens) => {
    if (pos >= tokens.length) {
        throw new LudwigError(filename, tokens[tokens.length - 1].line, tokens[tokens.length - 1].column, `Expected '${token}'`)
    }
    if (tokens[pos].value !== token) {
        throw new LudwigError(filename, tokens[pos].line, tokens[pos].column, `Expected '${token}'`)
    }
}

module.exports = parse