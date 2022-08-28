function proxyData (vm, target, key) {
  Object.defineProperty(vm, key, {
    get () {
      // console.log('proxy data', key);
      return vm[target][key];
    },
    set (newValue) {
      // console.log('proxy data', newValue);
      vm[target][key] = newValue;
    }
  })
}

export default proxyData;