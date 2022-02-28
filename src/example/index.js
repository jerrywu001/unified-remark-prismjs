const fs = require('fs');
const path = require('path');
const unified = require('unified');
const remarkPrism = require('../index.js');
const remarkParse = require('remark-parse');
const rehypeFormat = require('rehype-format');
const rehypeDocument = require('rehype-document');
const rehypeStringify = require('rehype-stringify');
const remarkRehype = require('remark-rehype');
const reporter = require('vfile-reporter');

const getResolvedMarkdown = async () => {
  const style = await fs.readFileSync(path.join(process.cwd(), './src/style.css'), { encoding: 'utf-8' });
  const str = await fs.readFileSync(path.join(process.cwd(), './src/example/test.md'), { encoding: 'utf-8' });
  const file = await unified()
    .use(remarkParse)
    .use(remarkPrism, {
      showLanguage: true,
      enableCopy: true,
      plugins: [
        'autolinker',
        'show-invisibles',
        'data-uri-highlight',
        'inline-color',
        'line-numbers',
        'diff-highlight',
        'treeview',
        'command-line',
      ],
    })
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeDocument, {
      title: 'code playground',
      css: [
        'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-one-light.min.css',
        'https://cdn.jsdelivr.net/npm/prismjs@1.27.0/plugins/line-numbers/prism-line-numbers.min.css',
        'https://cdn.jsdelivr.net/npm/prismjs@1.27.0/plugins/inline-color/prism-inline-color.min.css',
        'https://cdn.jsdelivr.net/npm/prismjs@1.27.0/plugins/diff-highlight/prism-diff-highlight.min.css',
        'https://cdn.jsdelivr.net/npm/prismjs@1.27.0/plugins/treeview/prism-treeview.min.css',
        'https://cdn.jsdelivr.net/npm/prismjs@1.27.0/plugins/command-line/prism-command-line.min.css',
        'https://cdn.jsdelivr.net/npm/prismjs@1.27.0/plugins/show-invisibles/prism-show-invisibles.min.css',
      ],
      style,
    })
    .use(rehypeStringify)
    .process(str);

  console.error(reporter(file));
  return String(file);
};

const http = require('http');
const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    const html = await getResolvedMarkdown();
    res.end(html);
  }
});

// when test.md change, refresh your browser
server.listen('3000', function() {
  console.log('server started, http://localhost:3000')
});

