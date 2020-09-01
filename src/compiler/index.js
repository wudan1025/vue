import { parseHTML } from "./parse";
// import { generate } from "./generate";


export function compileToFunctions(template) {
    let ast = parseHTML(template)

    // let code = generate(ast)

    // let render = new Function()
}