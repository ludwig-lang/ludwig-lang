const ludwig = require('../index')
const fs = require('fs')

const source = fs.readFileSync(__dirname +'/test.ludwig', 'utf-8')
ludwig.eval(source, 'tests')
const failed = ludwig.builtins['failed-tests']('get')
if (failed) {
    console.error(`${failed} tests failed`)
}
process.exit(failed && 1)