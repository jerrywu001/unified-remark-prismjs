const { copy } = require('copy-to-clipboard');

module.exports = function initCodeCopy(btnSelectorName = '.code-copy-block') {
  const btns = document.querySelectorAll(btnSelectorName);
  for (const btn of btns) {
    const prevDom = btn.parentElement.querySelector('pre');
    if (prevDom) {
      const codeDom = prevDom.firstElementChild;
      if (codeDom.tagName.toLowerCase() === 'code') {
        const content = codeDom.innerText;
        (function (text, btnDom) {
          btnDom.addEventListener(
            'click',
            function () {
              copy(text);
              btnDom.classList.add('code-copied');
              setTimeout(() => {
                btnDom.classList.remove('code-copied');
              }, 1600);
            },
            false
          );
        })(content, btn);
      }
    }
  }
}
