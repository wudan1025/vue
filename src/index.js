import { initMixin } from './init'
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vdom/index";
import { initGlobalApi } from './global-api/index'
import { stateMixin } from './state'



function Vue(options) {
    // 组件初始化入口
    this._init(options)
}

// 写成插件对原型进行扩展
initMixin(Vue) // init
lifecycleMixin(Vue); // 混合生命周期 渲染 _updata
renderMixin(Vue); // _render

stateMixin(Vue);

// 静态方法 Vue.component Vue.directive Vue.extend Vue.mixin ...

initGlobalApi(Vue);

export default Vue