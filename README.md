# unified-remark-prismjs

> Syntax highlighter for markdown code blocks using Prism, **use with remark-rehype**

## installation

```bash
npm i unified-remark-prismjs
```

## usage

```js

const src = `
\`\`\`javascript
console.log('Hello World');
\`\`\`
`;

```

```javascript
require('unified')()
  .use(require('remark-parse'))
  .use(require('unified-remark-prismjs'), {
    /* options */
  })
  .use(require('remark-rehype'))
  .use(require('rehype-format'))
  .use(require('rehype-stringify'))
  .process(src, (err, file) => console.log(String(file)));
```

- output

```html
<div class="remark-highlight">
  <pre class="language-javascript">
    <code>
      <span class="token console class-name">console</span>
      <span class="token punctuation">.</span>
      <span class="token method function property-access">log</span>
      <span class="token punctuation">(</span>
      <span class="token string">'Hello World'</span>
      <span class="token punctuation">)</span>
      <span class="token punctuation">;</span>
    </code>
  </pre>
</div>
```

## Don't forget to import styles

- style for copy button, language tag, filename

```css
@import url('unified-remark-prismjs/src/style.css');
```

- prismjs plugin && theme styles have been used


```css
@import url('unified-remark-prismjs/src/style.css');
@import url('prism-themes/themes/prism-base16-ateliersulphurpool.light.min.css');
@import url('prismjs/plugins/line-numbers/prism-line-numbers.css');
@import url('prismjs/plugins/inline-color/prism-inline-color.min.css');
@import url('prismjs/plugins/diff-highlight/prism-diff-highlight.min.css');
@import url('prismjs/plugins/treeview/prism-treeview.min.css');
@import url('prismjs/plugins/command-line/prism-command-line.min.css');
@import url('prismjs/plugins/show-invisibles/prism-show-invisibles.min.css');
```

## full usage

> see [test.md](https://github.com/jerrywu001/unified-remark-prismjs/tree/main/src/example/test.md)

```bash
git clone git@github.com:jerrywu001/unified-remark-prismjs.git

cd unified-remark-prismjs

npm i

npm run play
```

## options

```js
use(require('unified-remark-prismjs'), {
  showLanguage: true, // show language tag
  enableCopy: true, // show copy button
  plugins: [], // some prismjs plugins
})
```

## options.plugins

```js
use(require('unified-remark-prismjs'), {
  plugins: [
    'autolinker',
    'show-invisibles',
    'data-uri-highlight',
    'diff-highlight',
    'inline-color',
    'line-numbers',
    'command-line',
    'treeview',
  ],
});
```
