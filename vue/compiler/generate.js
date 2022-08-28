/**
  <div id="app" style="color: red; font-size: 20px;">
    您好, {{ name }}
    <span class="text" style="color: green;">{{ age }}</span>
  </div> 

  _c() => createElement() 创建一个元素
  _v() => createTextNode() 创建文本节点
  _s() => {{}} => _s(name) 处理 {{}}

*/

// render () {
//   return `
//     _c(
//         "div", 
//         {
//           id: "app", 
//           style: {
//             "color": "red",
//             "font-size": "20px"
//           }
//         },
//         _v("你好, " + _s(name)),
//         _c(
//           "span",
//           {
//             "class": "text",
//             "style": {
//               "color": "green"
//             }
//           },
//           _v(_s(age))
//         )
//       ),
       
//     )
//   `
// }

// 匹配 {{}}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

// 处理参数 {id, style}
function formatProps (attrs) {
  let attrStr = '';

  for (var i = 0; i < attrs.length; i ++) {
    let attr = attrs[i];

    if (attr.name === 'style') {
      let styleAttrs = {};
      attr.value.split(';').map((styleAttr) => {
        let [key, value] = styleAttr.split(':');
        styleAttrs[key] = value;
      });

      attr.value = styleAttrs;
    }

    attrStr += `${attr.name}:${JSON.stringify(attr.value)},`;
  }

  return `{${attrStr.slice(0, -1)}}`; 
}

// 处理子字符串
function getChildren (el) {
  const children = el.children;

  if (children) {
    return children.map(c => generateChild(c)).join(',');
  }

}

function generateChild (node) {
  if (node.type === 1) {
    return generate(node);
  } else if (node.type === 3) {
    let text = node.text;

    if (!defaultTagRE.test(text)) { // 没有双括号
      return `_v(${JSON.stringify(text)})`;
    }  
    let match,
        index,
        // 正则表达式的一个可读可写的整形属性， 用来指定下一次匹配的起始索引。
        lastIndex = defaultTagRE.lastIndex = 0, 
        textArr = [];
  
    while (match = defaultTagRE.exec(text)) {
      /**
       * match.exec(str) -> 一个字符串中执行查找匹配的 RegExp 方法, 返回一个结果数组 或 Null；
       * 返回值： 
       *  [
       *    第一项： 完全匹配成功的文本，
       *    第二项： 后续每项对应一个匹配的捕获组
       *  ]
       *  数组的额外属性: 
       *   index 匹配的字符位于原始的字符串的基于0的位置
       *   input 匹配的原始字符串
       *   groups: 一个命名捕获组对象
       * [
       *    0: "{{ name }}"
       *    1: " name "
       * ]
       * 
       */
      index = match.index;
      // 
      if (index > lastIndex) { // 1. {{}} 之前的文字
        textArr.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      // 2. match[1] -> name 
      textArr.push(`_s(${match[1].trim()})`);
      // 3. lastIndex 更新 = index + match[0]的长度 -> while循环
      lastIndex = index + match[0].length;
    }
    // 4. 匹配不成功后, 如果lastIndex < 文本的全部长度 截取后面部分加入数组
    if (lastIndex < text.length) {
      textArr.push(JSON.stringify(text.slice(lastIndex)));
    }   
    // 返回 + 拼接的字符串
    return `_v(${textArr.join('+')})`; 
  }
}

// 生成 code, _c, _v, _s
function generate (el) {
  // console.log(el);  
  let children = getChildren(el);
  // 不能换行
  let code = `_c('${ el.tag }', ${
      el.attrs.length > 0
      ?
      `${ formatProps(el.attrs) }`
      : 
      'undefined'
    }${
      children ? `,${children}` : ''
    })`;

  return code;
} 

export {
  generate
}