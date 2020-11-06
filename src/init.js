import { initState } from "./state";
import { compileToFunctions } from "./compiler/index";
import { mountComponent, callHook } from "./lifecycle";
import { mergeOptions } from "./util";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // this 指向 new 出来的实例
        const vm = this;
        // 需要将用户自定义的options 和全局的options做合并
        // 子类 或者 vue 会调用 所以使用  constructor 调用
        // 合并到 实力上 可能是 组件 可能是 vue
        vm.$options = mergeOptions(vm.constructor.options, options);
        callHook(vm, 'beforeCreate')

        initState(vm); // 初始化状态
        callHook(vm, 'created')

        if (vm.$options.el) { // 挂载逻辑
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el)
        vm.$el = el

        if (!options.render) {
            // 没有render 将 template 转化为render
            let template = options.template
            if (!template && el) {
                // 没有 template 将给定el 作为 template
                template = el.outerHTML
            }
            // 将 dom 字符串 编译为render 函数
            const render = compileToFunctions(template)
            // console.log(render)
            options.render = render
        }
        mountComponent(vm, el)
    }
}