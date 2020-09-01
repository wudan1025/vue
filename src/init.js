import { initState } from "./state";
import { compileToFunctions } from "./compiler/index";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // this 指向 new 出来的实例
        const vm = this;
        vm.$options = options;
        initState(vm);

        if (vm.$options.el) {
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
            options.render = render
        }

        // mountComponent(vm,el)

    }
}