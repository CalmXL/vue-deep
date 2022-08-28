import { initMixin } from './init.js';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vdom';

// Vue 构造函数
function Vue (options) {
  this._init(options); // 执行初始化函数
}
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

// Vue.prototype._init = function (options) {
//   var vm = this;

//   vm.$options = options;

//   initState(vm);

//   // vm options 中存在el属性
//   if (vm.$options.el) {
//     // 调用 $mount 方法属性
//     vm.$mount(vm.$options.el);
//   } 
// }


// Vue.prototype.$mount = function (el) {
//   const vm = this,
//         options = vm.$options;
//   // 获取真实的el, 作为$el
//   el = document.querySelector(el),
//   vm.$el = el;

//   /**
//    * options 中不存在 render， 
//    */
//   if (!options.render) {
    
//     let template = options.template;

//     if (!template && el) {
//       // 不存在 template 但是存在 el 
//       template = el.outerHTML; 
//     }

//     // 将 template 传入 compilerToRenderFunction 创建render
//     const render = compileToRenderFunction(template);
//     options.$render = render;
//   } 

//   mountComponent(vm);

// }

export default Vue;