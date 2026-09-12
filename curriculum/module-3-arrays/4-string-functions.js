/* curriculum/module-3-arrays/4-string-functions.js */
export default {
  title: "Handy String Functions",
  theory: `
    <h2>Handy String Functions</h2>
    <p>The <code>&lt;string.h&gt;</code> library gives you ready-made tools so you don't loop over characters by hand.</p>
    <ul>
      <li><code>strlen(s)</code> - length of <code>s</code> (not counting <code>'\\0'</code>)</li>
      <li><code>strcpy(dst, src)</code> - copy <code>src</code> into <code>dst</code></li>
      <li><code>strcmp(a, b)</code> - compare; <code>0</code> means equal</li>
    </ul>
    <pre>#include &lt;string.h&gt;

char word[] = "Hello";
int len = strlen(word);   // 5</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Include <code>&lt;string.h&gt;</code> and use <code>strlen</code> to store the length of <code>word</code> in <code>len</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    char word[] = "Hello";\n    int len;\n    // measure the word below\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('string.h')) return "Include <string.h> to use string functions.";
    if (!src.includes('strlen')) return "Use strlen() to get the length.";
    if (!src.includes('len')) return "Store the result in len.";
    return true;
  }
};
