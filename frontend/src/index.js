const ludwig = require('ludwig-lang-common')


ludwig.builtins.prompt = p => {
    ludwig.safety.unsafe()
    return prompt(p)
}

module.exports = ludwig