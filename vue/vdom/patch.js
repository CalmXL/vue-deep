/**
 * 打补丁， vnode -> 真实DOM
 * @param {*} oldNode 
 * @param {*} vNode 
 */
function patch (oldNode, vNode) {
  let el = createElement(vNode),
      parentElement = oldNode.parentNode;

  parentElement.insertBefore(el, oldNode.nextSibling);
  parentElement.removeChild(oldNode);
}

// 创建真实元素
function createElement (vnode) {
  const { tag, props, children, text } = vnode;

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag);
    updateProps(vnode);
    children.map((child) => {
      vnode.el.appendChild(createElement(child));
    })
  } else {
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}

// 为 dom 设置样式
function updateProps (vnode) {
  const el = vnode.el,
        newProps = vnode.props || {};
  console.log(newProps);
  for (let key in newProps) {
    if (key === 'style') {
      for (let key in newProps.style) {
        el.style[key] = newProps.style[key];
      }
    } else if (key === 'class') {
      el.className = el.className;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}

export {
  patch
}