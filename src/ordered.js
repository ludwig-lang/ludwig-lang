const ordered = (x, y) => {
    if (typeof x === 'function') {
        if (x.equals) {
            return x.equals(y)
        }
        return x === y
    }
    return x <= y
}

module.exports = ordered