import defineReactiveData from './reactive';
import { arrMethods } from './array';  
import observeArr from './observrArr';

// Observe 观察者构造函数
function Observer (data) {
  // 处理 data 为数组的情况
  if (Array.isArray(data)) {
    data.__proto__ = arrMethods;
    observeArr(data);
  } else { // 处理 data 为对象的情况
    this.walk(data);
  }
}

Observer.prototype.walk = function (data) {
  var keys = Object.keys(data);

  for (var i = 0; i < keys.length; i ++) {
    var key = keys[i],
        value = data[key];

    // 定义响应式数据
    defineReactiveData(data, key, value);
  }
}

export default Observer;