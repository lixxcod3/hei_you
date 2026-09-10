/* curriculum/module-0-hello/0-the-foundation.js
   One lesson = one file. Exports a single lesson object with the same shape
   lesson_script.js expects: title, theory, starter, validate. */
export default {
  title: "The Foundation",
  theory: `
    <h2>The Foundation</h2>
    <p>Every C program needs a starting point, which is the <code>main()</code> function. To print text, we borrow tools from the standard library using <code>#include &lt;stdio.h&gt;</code>.</p>
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
