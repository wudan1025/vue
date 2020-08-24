import { initState } from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // this 指向 new 出来的实例
        const vm = this;
        vm.$options = options;
        initState(vm);
    }
}