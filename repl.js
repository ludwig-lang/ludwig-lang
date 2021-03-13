const ludwig = require('./index')

const env = ludwig.env()

while (true) {
    const line = env.prompt('')
    if (line === '') {
        break
    }
    try {
        const result = ludwig.eval(line, '', env)
        if (result !== undefined && result !== null) {
            console.log(result);
        }
    } catch (e) {
        console.error(e)
    }
}