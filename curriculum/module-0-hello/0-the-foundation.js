/* curriculum/module-0-hello/0-the-foundation.js */
export default {
  title: "The Foundation",
  theory: `
    <h2>The Foundation</h2>
    <p>Every C program is built from a few fixed parts. Before you write anything clever, you need the skeleton the compiler expects — think of it as laying the first brick.</p>

    <h3>The three pieces</h3>
    <ul>
      <li><code>#include &lt;stdio.h&gt;</code> — pulls in the <em>standard input/output</em> library so you can use <code>printf</code>.</li>
      <li><code>int main(void) { ... }</code> — the <strong>entry point</strong>. Execution always starts here.</li>
      <li><code>return 0;</code> — tells the system the program finished successfully.</li>
    </ul>

    <h3>Printing text</h3>
    <p><code>printf</code> writes text to the screen. Every statement in C must end with a semicolon <code>;</code> — forgetting it is the most common first error.</p>
    <pre>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello, World!");
    return 0;
}</pre>
    <p>The line above prints <code>Hello, World!</code> and nothing more — no new line unless you add one yourself.</p>

    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Add the missing semicolon (<code>;</code>) and change the text to print exactly <strong>Hello, Builder!</strong></p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!")\n    return 0;\n}`,
  validate(src) {
    if (!src.includes(';')) return "Error: Missing a semicolon (;) at the end of your statement.";
    if (!src.includes('Hello, Builder!')) return "Error: Output text must contain 'Hello, Builder!'";
    return true;
  }
};

