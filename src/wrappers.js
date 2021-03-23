class BaseWrapper extends Function {
    constructor(object, fun) {
        super('x', `return this.__self__.fun(x)`)
        const self = this.bind(this)
        this.__self__ = self
        self.object = object
        self.fun = fun
        self.size = object.size
        return self
    }

    equals(other) {
        return this.object.equals(other.object)
    }

    hashCode() {
        return this.object.hashCode()
    }

    has(value) {
        return this.object.has(value)
    }

    toString() {
        return this.object.toString()
    }
}

class ListWrapper extends BaseWrapper {
    constructor(list) {
        super(list, consumer => {
            for (let x of list) {
                consumer(x)
            }
        })
    }

    get(index) {
        return this.object.get(index)
    }
}

class SetWrapper extends BaseWrapper {
    constructor(set) {
        super(set, consumer => {
            for (let x of set) {
                consumer(x)
            }
        })
    }
}

class MapWrapper extends BaseWrapper {
    constructor(map) {
        super(map, key => map.get(key))
    }
}


module.exports = {ListWrapper, SetWrapper, MapWrapper}