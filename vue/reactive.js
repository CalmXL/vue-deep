import observe from "./observe";

function defineReactiveData (data, key, value) {
  observe(value); // value => 也可能是对象 => 需要 观察
  Object.defineProperty(data, key, {
    get () {
      // console.log('响应式数据 获取', value);
      return value
    },
    set (newValue) {
      // console.log('响应式数据 设置', newValue);
      data[key] = newValue;
    }
  })
}

export default defineReactiveData;