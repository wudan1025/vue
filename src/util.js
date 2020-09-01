export function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
        enumerable: false, // 不能被枚举，不能被循环出来 ?
        configurable: false,
        value
    })
}

export function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[data][key];
        },
        set(newvalue) {
            vm[data][key] = newvalue
        }
    })
}