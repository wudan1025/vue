import { arrayMethods } from './array'
import { defineProperty } from "../util";
class Observer {
    constructor(value) {
        // 通过使用__ob__判断元素是否 被监听过
        defineProperty(value, '__ob__', this);
        // 数组监听
        if (Array.isArray(value)) {
            // 重新定义原型上的方法
            value.__proto__ = arrayMethods;
            // 数组中还有对象的情况
            this.observeArray(value)
        } else {
            // 对象监听
            this.walk(value)
        }
    }

    observeArray(value) {
        value.forEach(item => {
            observe(item) // 监听数组中内容
        })
    }



    walk(data) {
        let keys = Object.keys(data)
        keys.forEach(key => {
            defineReactive(data, key, data[key])
        })
    }


}

function defineReactive(data, key, value) {
    observe(value) // 如果当前对象内还有对象，会递归调用 整个过程
    Object.defineProperty(data, key, {
        get() {
            // console.log('get')
            return value
        },
        set(newValue) {
            if (newValue == value) return
            observe(newValue) // 如果 set 的数据中还有 obj 继续进行监听
            value = newValue
            // console.log('set')
        }
    })
}

export function observe(data) {
    // 只对 object 类型数据监听，简单类型不进行监听
    if (typeof data != 'object' || data == null) {
        return data
    }

    // __ob__ 表示当前数据是否已被监听过
    if (data.__ob__) {
        return data
    }

    return new Observer(data)
}