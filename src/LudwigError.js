class LudwigError extends Error {
    constructor(file, line, column, message, cause) {
        super(`${file} ${line}:${column} ${message}`);
        this.file = file
        this.line = line
        this.column = column
        this.cause = cause
    }
}

module.exports = LudwigError