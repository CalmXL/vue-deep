import { ARR_METHODS } from "./config";
import observe from "./observe";

var originMethods = Array.prototype,
    arrMethods = Object.create(originMethods);

ARR_METHODS.map( function (m) {
  arrMethods[m] = function () {
    var args = Array.prototype.slice.call(arguments), 
        rt = originMethods[m].apply(this, args);

    var newArr;

    switch (m) {
      case 'push':
      case 'unshift': 
        newArr = args;
        break;
      case 'splice': 
        newArr = args.slice(2);
        break;
      default: 
        break;
    }

    newArr && observe(newArr);

    return rt;

  }
})

export {
  arrMethods
}