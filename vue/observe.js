import Observer from './observer';

function observe (data) {
  // 如果 data 不是 object 或者 data 等于 null, 则返回 不继续执行
  if (typeof data !==  'object' || typeof data === null) return;

  return new Observer(data);
}

export default observe;