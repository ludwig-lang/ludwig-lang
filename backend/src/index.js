const ludwig = require('ludwig-lang-common')
const syncRpc = require('sync-rpc')
const fs = require('fs')

require.extensions['.ludwig'] = (m, filename) => {
    const source = fs.readFileSync(filename, 'utf-8')
    const parent = module
    try {
        module = m
        m.exports = ludwig.eval(source, filename)
    } finally {
        module = parent
    }
}

ludwig.builtins.load = modulePath => module.require(modulePath.endsWith('.ludwig') ? modulePath : (modulePath + '.ludwig'))
ludwig.builtins.print = x => {
    ludwig.safety.unsafe()
    process.stdout.write(ludwig.builtins.str(x))
}
ludwig.builtins.prompt = question => {
    ludwig.safety.unsafe()
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
                process.stdout.write(ludwig.builtins.str(result) + '\n')
            }
        } catch (e) {
            console.error(e.message)
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