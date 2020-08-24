// 拿到原型上的方法
let oldArrayProtoMethods = Array.prototype

// 继承 原本的原型
export let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
    'push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'
]

methods.forEach(method => {
    // 重写 原型上的这些方法
    arrayMethods[method] = function (...args) {
        // 使用 ...args 将 arguments伪数组 转为 真正的数组
        const result = oldArrayProtoMethods[method].apply(this, args)
        let inserted;
        let ob = this.__ob__
        switch (method) {
            case 'push':
            case 'unshoft':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2); // 第三个参数为新增
            default:
                break;
        }
        // 对于新增的数据 做双向绑定
        if (inserted) ob.observeArray(inserted)
        return result
    }
})
