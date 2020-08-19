import { initState } from "./state";

export function initMixin(Vue) {
    // Vue.prototype._init = function (options) {
    //     console.log(this)
    //     window.vm2 = this
    //     const vm = this;
    //     vm.$options = options;
    //     initState(vm);
    // }

    Vue.prototype._init = () => {

    }
    //     () => {
    //     console.log(this)
    // }
}