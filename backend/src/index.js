const ludwig = require('ludwig-lang-common')
const builtins = require('ludwig-lang-common/builtins')
const safety = require('ludwig-lang-common/safety')
const syncRpc = require('sync-rpc')

require.extensions['.ludwig'] = (m, filename) => {
    const fs = require('fs')
    const source = fs.readFileSync(filename, 'utf-8')
    const parent = module
    try {
        module = m
        m.exports = ludwig.eval(source, filename)
    } finally {
        module = parent
    }
}

builtins.load = modulePath => module.require(modulePath.endsWith('.ludwig') ? modulePath : (modulePath + '.ludwig'))
builtins.print = x => {
    safety.unsafe()
    process.stdout.write(x + '')
}
builtins.prompt = question => {
    const syncPrompt = syncRpc(require.resolve('./prompt'))
    return syncPrompt(question)
}

const repl = () => {
    const env = ludwig.env()

    while (true) {
        const line = env.prompt('')
        if (line === '') {
            break
        }
        try {
            const result = ludwig.eval(line, '', env)
            if (result !== undefined && result !== null) {
                const savedToString = Function.prototype.toString
                Function.prototype.toString = () => 'λ'
                try {
                    console.log(result + '');
                } finally {
                    Function.prototype.toString = savedToString
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}

if (require.main === module) {
    const args = process.argv.slice(2)
    if (args.length) {
        builtins.load(args[0])
    } else {
        repl()
    }
}

module.exports = ludwig