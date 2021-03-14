const {isNode} = require('browser-or-node')

const prompt = () => question => new Promise((resolve, reject) => {
    if (isNode) {
        const readline = require('readline')

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        })

        rl.question(question, answer => {
            rl.close();
            resolve(answer)
        });
    } else {
        reject()
    }
})

module.exports = prompt
