(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // 拿到原型上的方法
  var oldArrayProtoMethods = Array.prototype; // 继承 原本的原型

  var arrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    // 重写 原型上的这些方法
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 使用 ...args 将 arguments伪数组 转为 真正的数组
      var result = oldArrayProtoMethods[method].apply(this, args);
      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshoft':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
      } // 对于新增的数据 做双向绑定


      if (inserted) ob.observeArray(inserted);
      return result;
    };
  });

  function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
      enumerable: false,
      // 不能被枚举，不能被循环出来 ?
      configurable: false,
      value: value
    });
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 通过使用__ob__判断元素是否 被监听过
      defineProperty(value, '__ob__', this); // 数组监听

      if (Array.isArray(value)) {
        // 重新定义原型上的方法
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        // 对象监听
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        value.forEach(function (item) {
          observe(item); // 监听数组中内容
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value); // 如果当前对象内还有对象，会递归调用 整个过程

    Object.defineProperty(data, key, {
      get: function get() {
        // console.log('get')
        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        observe(newValue); // 如果 set 的数据中还有 obj 继续进行监听

        value = newValue; // console.log('set')
      }
    });
  }

  function observe(data) {
    // 只对 object 类型数据监听，简单类型不进行监听
    if (_typeof(data) != 'object' || data == null) {
      return data;
    } // __ob__ 表示当前数据是否已被监听过


    if (data.__ob__) {
      return data;
    }

    return new Observer(data);
  }

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
    Vue.prototype._init = function (options) {
      // this 指向 new 出来的实例
      var vm = this;
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
