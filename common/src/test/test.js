const ludwig = require('../index')
const fs = require('fs')

const source = fs.readFileSync('./test.ludwig', 'utf-8')
const failed = ludwig.eval(source, 'tests')
if (failed) {
    console.error(`${failed} tests failed`)
}
process.exit(failed && 1)