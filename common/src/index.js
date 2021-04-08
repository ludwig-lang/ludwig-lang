const builtins = require('./builtins')
const stdlib = require('./stdlib')
const safety = require('./safety')
const LudwigError = require('./LudwigError')
const tokenize = require('./tokenize')
const parse = require('./parse')

const ludwig = {
    builtins,
    safety,
    tokenize,
    parse,
    env() {
        return Object.create(builtins)
    },
    eval(source, filename = 'code', env = this.env()) {
        return parse(source, filename)(env)
    },
    LudwigError
}

ludwig.eval(stdlib, 'stdlib', builtins)

module.exports = ludwig