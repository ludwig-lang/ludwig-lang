let safeMode = false

let unsafeCalls = 0

let gen = 0


module.exports = {
    safely(body) {
        const prevMode = safeMode
        safeMode = true
        if (!prevMode) {
            gen++
        }
        try {
            return body()
        } finally {
            safeMode = prevMode
        }
    },
    unsafe() {
        if (safeMode) {
            throw Error('Operation is not permitted in safe mode')
        }
        unsafeCalls++
    },
    generation() {
        return gen
    },
    checkSafe(body) {
        const savedUnsafeCalls = unsafeCalls
        const result = body()
        return [result, unsafeCalls === savedUnsafeCalls]
    }
}