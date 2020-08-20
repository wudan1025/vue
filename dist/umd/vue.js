(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function initState(vm) {
      // vm.$options
      var opts = vm.$options;

      if (opts.props) ;

      if (opts.methods) ;

      if (opts.data) {
        initData(vm);
      }

      if (opts.computed) ;

      if (opts.watch) ;
    }

    function initData(vm) {
      // 数据的初始化操作
      var data = vm.$options.data;
      vm._data = data = typeof data == 'function' ? data.call(vm) : data; // // 数据的劫持方案 对象Object.defineProperty
      // // 数组 单独处理的
      // // 当我去vm上取属性时 ，帮我将属性的取值代理到vm._data上
      // for (let key in data) {
      //     proxy(vm, '_data', key);
      // }

      observe(data);
    }

    function initMixin(Vue) {
      var _this = this;

      Vue.prototype._init = function () {
        // this 指向 new 出来的实例
        var vm = _this;
        vm.$options = options;
        initState(vm);
      };
    }

    function Vue(options) {
      this._init(options);
    } // 写成插件对原型进行扩展


    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
