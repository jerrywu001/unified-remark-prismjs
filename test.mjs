import unified from 'unified';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkPrism from './src/index.js';

// full usage: src/example/test.md
const src = `
\`\`\`javascript
console.log('Hello Worlds');
\`\`\`
`;

unified()()
  .use(remarkParse)
  .use(remarkPrism, {
    /* options */
    showLanguage: true,
    enableCopy: true,
    plugins: [
      'autolinker',
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
  .use(rehypeStringify)
  .process(src, (err, file) => console.log(String(file)));
