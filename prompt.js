const readline = require('readline')


const prompt = () => question => new Promise(resolve => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    })

    rl.question(question, answer => {
        rl.close();
        resolve(answer)
    });
})

module.exports = prompt
