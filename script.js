document.addEventListener('DOMContentLoaded', function () {
  var starter = '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}';
  var code = document.getElementById('code');
  var out = document.getElementById('out');
  var verdict = document.getElementById('verdict');
  var burgerBtn = document.getElementById('burger-btn');
  var navLinks = document.querySelector('.nav-links');

  var winFace = '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="3" width="20" height="20" fill="#3F7A5C" stroke="#1C2436" stroke-width="2"/><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/><rect x="9" y="16" width="8" height="2" fill="#fff"/></svg>';
  var loseFace = '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="3" width="20" height="20" fill="#A8324A" stroke="#1C2436" stroke-width="2"/><rect x="8" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/><rect x="9" y="17" width="8" height="2" fill="#fff"/></svg>';

  // mobile navigation toggle
  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', function () {
      navLinks.style.display = (getComputedStyle(navLinks).display === 'none' ? 'flex' : 'none');
    });
  }

  // extract text inside the FIRST printf("...")
  function firstPrintf(src) {
    var m = src.match(/printf\s*\(\s*"((?:[^"\\]|\\.)*)"/);
    return m ? m[1] : null;
  }

  function render(str) {
    return str
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  function run() {
    var src = code.value;
    var errors = [];

    if (!/#include\s*<stdio\.h>/.test(src)) {
      errors.push("main.c:1: warning: implicit declaration of 'printf' — did you #include <stdio.h>?");
    }
    if (!/\bint\s+main\s*\(/.test(src)) {
      errors.push("main.c: error: no 'int main(...)' entry point found");
    }
    if (!/printf\s*\(/.test(src)) {
      errors.push("main.c: error: nothing to print — try a printf(...) call");
    }

    // crude balance + semicolon checks
    var opens = (src.match(/\{/g) || []).length;
    var closes = (src.match(/\}/g) || []).length;
    if (opens !== closes) {
      errors.push("main.c: error: mismatched braces { } — expected '}' before end of file");
    }
    if (/printf\s*\([^;]*\)\s*(?!\s*;)[\r\n]/.test(src) && !/printf[\s\S]*?;/.test(src)) {
      errors.push("main.c: error: expected ';' after statement");
    }

    if (errors.length) {
      out.innerHTML = '<span class="err">✗ Build failed (' + errors.length + ' issue' + (errors.length > 1 ? 's' : '') + ')</span>\n\n' + errors.join('\n');
      verdict.className = 'verdict lose';
      verdict.innerHTML = loseFace + '<span>Professor Wáng: “Shame on you.” 太可惜了 — fix it and rerun.</span>';
      return;
    }

    var printed = firstPrintf(src);
    var output = printed !== null ? render(printed) : '';
    out.innerHTML = '<span class="ok">✓ Compiled main.c — running…</span>\n\n' + output.replace(/</g, '&lt;') + '\n<span class="ok">[process exited with code 0]</span>';
    verdict.className = 'verdict win';
    verdict.innerHTML = winFace + '<span>Professor Wáng: “Proud of you.” 好样的 — brick placed.</span>';
  }

  function reset() {
    code.value = starter;
    out.innerHTML = 'Press <b>Compile &amp; Run</b> to build main.c…';
    verdict.className = 'verdict';
    verdict.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="3" width="20" height="20" fill="#2E3A55" stroke="#1C2436" stroke-width="2"/><rect x="9" y="9" width="3" height="3" fill="#fff"/><rect x="15" y="9" width="3" height="3" fill="#fff"/></svg><span>Waiting for your code…</span>';
  }

  document.getElementById('run').addEventListener('click', run);
  document.getElementById('reset').addEventListener('click', reset);

  // allow Tab to indent inside the editor
  code.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      var s = this.selectionStart;
      var en = this.selectionEnd;
      this.value = this.value.slice(0, s) + '    ' + this.value.slice(en);
      this.selectionStart = this.selectionEnd = s + 4;
    }
  });
});