import { parseHTML } from "./parse";
import { generate } from "./generate";


export function compileToFunctions(template) {
    // debugger
    // 生成 ast 树
    let ast = parseHTML(template)

    // 通过 ast 树生成代码
    let code = generate(ast)
    // console.log(code)

    // 4.将字符串变成函数 限制取值范围 通过with来进行取值 
    // 稍后调用render函数就可以通过改变this 让这个函数内部取到结果了
    // 改变 this 指向
    let render = new Function(`with(this){return ${code}}`);

    return render;

}