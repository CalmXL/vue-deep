import { patch } from './vdom/patch';

// 挂载到组件
function mountComponent (vm) {
                // vnode
  vm._update(vm._render());
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    patch(vm.$el, vnode);
  }
}

export {
  mountComponent,
  lifecycleMixin
}