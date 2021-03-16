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