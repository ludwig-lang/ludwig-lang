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
    ludwig.builtins.println(`Ludwig v${ludwig.builtins['language-version']}`)
    const env = ludwig.env()

    let source = ''
    while (true) {
        const line = env.prompt('')
        source = (source ? (source + '\n') : '') + line
        if (!source) {
            break
        }
        try {
            const tokens = ludwig.tokenize(source)
            if(tokens.length) {
                const last = tokens[tokens.length - 1].value
                if (last.startsWith('`') && (last.length === 1 || !last.endsWith('`'))) {
                    continue
                }
            }
            const level = tokens.reduce((l, t) => {
                switch (t.value) {
                    case '[':
                        return l + 1
                    case ']':
                        return l - 1
                    default:
                        return l
                }
            }, 0)
            if (level <= 0) {
                try {
                    const result = ludwig.eval(source, '', env)
                    if (result !== undefined && result !== null) {
                        ludwig.builtins.println(result)
                    }
                } finally {
                    source = ''
                }
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