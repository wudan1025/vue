(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function initMixin(Vue) {
      // Vue.prototype._init = function (options) {
      //     console.log(this)
      //     window.vm2 = this
      //     const vm = this;
      //     vm.$options = options;
      //     initState(vm);
      // }
      Vue.prototype._init = function () {}; //     () => {
      //     console.log(this)
      // }

    }

    function Vue(options) {
      this._init(options);
    } // 写成插件对原型进行扩展


    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
