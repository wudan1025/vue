import { initMixin } from './init'


function Vue(options) {
    this._init(options)
}

// 写成插件对原型进行扩展
initMixin(Vue)

export default Vue