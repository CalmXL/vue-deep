# 模板编译

## 1. 模板编译流程

1. 获取template
2. template -> AST 树
   - AST  -> Abstract syntax tree 抽象语法树
   - 源代码的抽象语法结构的树状描述

   通过 匹配 -> 解析 -> 截取解析完成的部分 -> 最终形成AST树

3. AST -> render函数 -> _c _v _s
   
   正则匹配 -> 拼接字符 -> 更新lastIndex -> 形成 render code

4. render 函数 -> 虚拟节点
   renderMixin -> 
      _c() => createElement() 创建一个元素
      _v() => createTextNode() 创建文本节点
      _s() => {{}} => _s(name) 处理 {{}}

5. 设置PATCH -> 打补丁到真实DOM
   将 vnode -> 真正的dom， 设置 attribute
   最终替换到页面中




