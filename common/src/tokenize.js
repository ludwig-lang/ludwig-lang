module.exports = (source, ignoreComments, ignoreWhitespace = true) => {
    const tokens = []
    let pos = 0

    function token(pos, value) {
        // TODO: Get rid of O(n^2)
        let line = 1
        let column = 0
        for (let i = 0; i <= pos; i++) {
            if (source[i] === '\n') {
                line++
                column = 0
            } else {
                column++
            }
        }
        return {pos, line, column, value}
    }

    while (pos < source.length) {
        let c = source[pos++]
        if (c.trim() === '') {
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
}