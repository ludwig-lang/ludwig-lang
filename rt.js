const LIST = Symbol('list')

class Result {
    constructor(tag, value) {
        this.tag = tag
        this.value = value
    }
}


module.exports = {
    Result,
    LIST,
}