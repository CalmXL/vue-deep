import proxyData from "./proxy";
import observe from './observe';
import { compileToRenderFunction } from './compiler'
import { mountComponent } from "./lifecycle";

function initState (vm) {
  if (vm.$options.data) {
    initData(vm);
  }
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

  // vm.title = '学生列表'
  for (var key in data) {
    // 将data进行数据代理 
    proxyData(vm, '_data', key);
  }

  // 观察data
  observe(data);
}

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
  
    vm.$options = options;
  
    initState(vm);
  
    // vm options 中存在el属性
    if (vm.$options.el) {
      // 调用 $mount 方法属性
      vm.$mount(vm.$options.el);
    } 
  }
  
  
  Vue.prototype.$mount = function (el) {
    const vm = this,
          options = vm.$options;
    // 获取真实的el, 作为$el
    el = document.querySelector(el),
    vm.$el = el;
  
    /**
     * options 中不存在 render， 
     */
    if (!options.render) {
      
      let template = options.template;
  
      if (!template && el) {
        // 不存在 template 但是存在 el 
        template = el.outerHTML; 
      }
  
      // 将 template 传入 compilerToRenderFunction 创建render
      const render = compileToRenderFunction(template);
      options.$render = render;
    } 
  
    mountComponent(vm);
  
  }
}

export { initState, initMixin } 