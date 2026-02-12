import * as MarkdownIt from "markdown-it";
import Prism from "prismjs";
import "github-markdown-css/github-markdown-light.css";
// import anchor from 'markdown-it-anchor' // 시간 되면 나중에
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

// md file init and setting
export const md = new (MarkdownIt.default || MarkdownIt)({
  linkify: true,
  typographer: true,
  html: true,
  highlight: function (str, lang) {
    if (lang === "javascript" || lang === "js") {
      try {
        return `<pre class="language-javascript"><code>
                ${Prism.highlight(
                  str,
                  Prism.languages.javascript,
                  "javascript",
                )}</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="language-${lang}"><code>${md.utils.escapeHtml(
      str,
    )}</code></pre>`;
  },
});
