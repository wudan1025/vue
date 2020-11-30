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

export const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
];

const strats = {};
strats.data = function (parentVal, childValue) {
    return childValue; // 这里应该有合并data的策略
}

function mergeHook(parentVal, childValue) { // 生命周期的合并
    if (childValue) {
        if (parentVal) {
            return parentVal.concat(childValue); // 爸爸和儿子进行拼接
        } else {
            return [childValue]; //儿子需要转化成数组
        }
    } else {
        return parentVal; // 不合并了 采用父亲的
    }
}

LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})



export function mergeOptions(parent, child) {
    // 遍历父亲 ，可能是父亲有 儿子没有 
    const options = {};
    for (let key in parent) { // 父亲和儿子都有在这就处理了
        mergeField(key);
    }
    // 儿子有父亲没有 在这处理
    for (let key in child) { // 将儿子多的赋予到父亲上
        if (!parent.hasOwnProperty(key)) {
            mergeField(key);
        }
    }

    function mergeField(key) { // 合并字段
        // 根据key 不同的策略来进行合并 
        if (strats[key]) {
            options[key] = strats[key](parent[key], child[key]);
        } else {
            // todo默认合并
            options[key] = child[key]
        }
    }

    // console.log(options)
    return options;
}

const callbacks = [];
let pending = false;
function flushCallbacks() {
    while (callbacks.length) {
        let cb = callbacks.shift();
        cb();
    } // 让nextTick中传入的方法依次执行
    pending = false // 标识已经执行完毕
}
let timerFunc;
if (Promise) {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks); // 异步处理更新
    }
} else if (MutationObserver) { // 可以监控dom变化,监控完毕后是异步更新
    let observe = new MutationObserver(flushCallbacks);
    let textNode = document.createTextNode(1); // 先创建一个文本节点
    observe.observe(textNode, { characterData: true }); // 观测文本节点中的内容
    timerFunc = () => {
        textNode.textContent = 2; // 文中的内容改成2
    }
} else if (setImmediate) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks)
    }
}
export function nextTick(cb) { // 因为内部会调用nextTick 用户也会调用，但是异步只需要一次
    callbacks.push(cb);
    if (!pending) {
        // vue3 里的nextTick原理就是promise.then 没有做兼容性处理了
        timerFunc();// 这个方法是异步方法 做了兼容处理了
        pending = true;
    }
}