import { parseHtmlToAst } from './astParser';
import { generate } from './generate';

// 编译渲染函数
function compileToRenderFunction (html) {
  // 将 html 模板 => ast 树
  const ast = parseHtmlToAst(html),
        code = generate(ast), // 通过 ast -> code
        render = new Function(`
          with(this) { return ${code}}
        `);
  console.log(ast);
  return render;
  
  // console.log(render);
  // console.log(code);
}

export {
  compileToRenderFunction
}