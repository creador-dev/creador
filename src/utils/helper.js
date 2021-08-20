import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"

hljs.configure({
  languages: ["php", "javascript", "json", "bash", "scss"],
})

const highlightCode = () => {
  const codes = document.querySelectorAll(".wp-block-syntaxhighlighter-code > pre, pre > code")
  for (let key in codes) {
    if (typeof codes[key] === "object") {
      hljs.highlightElement(codes[key])
    }
  }
}

export default { highlightCode }