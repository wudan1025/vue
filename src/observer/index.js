import { arrayMethods } from './array'
import { defineProperty } from "../util";
import Dep from "./dep";
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


// 封装 继承
function defineReactive(data, key, value) {
    // 获取到数组对应的dep
    // 如果当前对象内还有对象，会递归调用 整个过程
    let childDep = observe(value); // 如果值是对象类型在进行观测

    let dep = new Dep(); // 每个属性都有一个dep 
    // 当页面取值时 说明这个值用来渲染了，将这个watcher和这个属性对应起来
    Object.defineProperty(data, key, {
        get() { // 依赖收集
            // console.log('属性获取')
            if (Dep.target) { // 让这个属性记住这个watcher
                dep.depend();
                if (childDep) { // 可能是数组可能是对象
                    // 默认给数组增加了一个dep属性，当对数组这个对象取值的时候
                    childDep.dep.depend(); // 数组存起来了这个渲染watcher
                }
            }
            return value
        },
        set(newValue) { // 依赖更新
            console.log('属性赋值')
            if (newValue === value) return;
            // 如果 set 的数据中还有 obj 继续进行监听
            observe(newValue); // 如果用户将值改为对象继续监控
            value = newValue;

            dep.notify(); // 异步更新 防止频繁操作
        }
    });
    // 数组的更新 去重  优化  组件渲染
}


export function observe(data) {
    // 只对 object 类型数据监听，简单类型不进行监听
    if (typeof data != 'object' || data == null) {
        return;
    }

    // __ob__ 表示当前数据是否已被监听过
    if (data.__ob__) {
        return data
    }

    return new Observer(data)
}