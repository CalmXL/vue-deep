// & html => ast
/**
  <div id="app" style="color: red; font-size: 20px;">
    您好, {{ name }}
    <span class="text" style="color: green;">{{ age }}</span>
  </div> 
 */

/**
  {
    tag: 'div',
    type: 1,
    children: [
      { 
        type: 3, 
        text: '你好, {{ name }}'
      },
      {
        tag: 'span',
        type: 1,
        children: [
          {
            type: 3,
            text: {{ age }}
          }
        ],
        parent: ''
        attrs: [
          { name : 'class', value: 'text' },
          {
            name: 'style', value: { color: green }
          }
        ]
      }, 
    ],
    parent: '',
    attrs: [
      { name: 'id', value: 'app'},
      { name: 'style', value: {
        color: red;
        font-size: 20px;
      }}
    ]
  }
*/


// id="app" id='app' id=app
const attribute =/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 标签名 <my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// 匹配特殊标签 <my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// > />
const startTagClose = /^\s*(\/?)>/
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)


// html => Ast
//匹配一段进行截取， 知道全部匹配
function parseHtmlToAst (html) {
  let text,
      root, // 根节点保存
      currentParent,
      stack = [];

  while (html) {
    // 寻找文本结束， 也就是 < 标签开始的 位置
    let textEnd = html.indexOf('<')
    
    // 1. textEnd === 0， 起始没有文本
    if (textEnd === 0) {

      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      // </div> 处理
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        // console.log(endTagMatch);
        // 再次前进
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    // 2. 起始有文本， 直接截取
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }

    if (text) {
      // 再次前进， 截取
      advance(text.length);
      // 处理text
      chars(text);
    }
  }

  // 解析开始标签
  function parseStartTag () {
    const start = html.match(startTagOpen);

    // 用于标识 结束， 属性匹配
    let end,
        attr;

    if (start) {
      // 匹配成功， 创建match 对象，
      const match = {
        tagName: start[1],
        attrs: [],
      }
      // 字符串前进， 截取字符串, 匹配成功部分被截取掉
      advance(start[0].length);

      // 没有匹配到 > 标签， 但是匹配到了属性
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // match -> attrs ->  push
        // <div id="app"> | <div id=app> | <div id='app'>
        console.log(attr);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
        // 再次截取
        advance(attr[0].length);
      } 
      
      // end -> > 匹配到
      if (end) {
        // console.log(end);
        advance(end[0].length);
        // console.log(match);
        return match; 
      }
    }
  }

  // advance 前进， 移动
  function advance (n) {
    // 截取字符串
    html = html.substring(n);
  }

  // 开始 start
  function start (tagName, attrs) {
    // console.log('-----------------开始--------------');
    // console.log(tagName, attrs);
    // 创建 element
    const element = createASTElement(tagName, attrs);
    // 判断root -> 根节点
    if (!root) {
      root = element;
    }
    currentParent = element;
    // 元素入栈
    stack.push(element);
  }
  
  // 匹配结束
  function end (tagName) {
    // console.log('-----------------结束--------------');
    // console.log(tagName);
    // 从栈中取出最后一位
    const element = stack.pop();
    // 通过栈解构判断 元素的赋值层级关系
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      // 存在父亲 将父亲儿子关系建立
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }
  
  // 处理字符
  function chars (text) {
    // console.log('-----------------文本--------------');
    // console.log(text);
    // 先去除左右空格
    text = text.trim();

    if (text.length > 0) {
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }
  
  // 创建 ASTElement
  function createASTElement (tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
    }
  }

  console.log(root);
  return root;

}

export {
  parseHtmlToAst
}