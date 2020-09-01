const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名
// ?:匹配不捕获
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // </my:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的    aaa="aaa"  a='aaa'   a=aaa
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >    >   <div></div>  <br/>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;


export function parseHTML(html) {
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName, // 标签名
            type: 1, // 元素类型
            children: [], // 孩子列表
            attrs, // 属性集合
            parent: null // 父元素
        }
    }

    let root;
    let currentParent;
    let stack = [];
    // 创建一个元素 作为根元素
    function start(tagName, attrs) {
        let element = createASTElement()
    }
}