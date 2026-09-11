/* curriculum/module-0-hello/0-your-first-program.js */
export default {
  title: "Your First Program",
  theory: `
    <h2>Your First Program</h2>
    <p>Every C program starts life the same way: include a library, open <code>main()</code>, do something, then return. Let's write the classic first program.</p>
    <h3>The pieces</h3>
    <ul>
      <li><code>#include &lt;stdio.h&gt;</code> — brings in <code>printf</code>.</li>
      <li><code>int main(void) { ... }</code> — where the program starts.</li>
      <li><code>printf("...")</code> — prints text to the screen.</li>
      <li><code>return 0;</code> — signals success.</li>
    </ul>
    <pre>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello, World!");
    return 0;
}</pre>
    <p>Remember: every statement ends with a semicolon <code>;</code>.</p>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Use <code>printf</code> to print exactly <strong>Hello, World!</strong> — and don't forget the semicolon.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    // print the greeting here\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('printf')) return "Use printf() to print your message.";
    if (!src.includes('Hello, World!')) return "The output must contain 'Hello, World!'";
    if (!src.includes(';')) return "Every statement needs a semicolon (;).";
    return true;
  }
};
