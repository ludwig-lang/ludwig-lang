const ludwig = require('ludwig-lang-common')
const builtins = require('ludwig-lang-common/builtins')
const safety = require('ludwig-lang-common/safety')

builtins.prompt = p => {
    safety.unsafe()
    return prompt(p)
}

module.exports = ludwig