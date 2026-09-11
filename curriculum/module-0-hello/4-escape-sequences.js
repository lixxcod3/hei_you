/* curriculum/module-0-hello/4-escape-sequences.js */
export default {
  title: "Escape Sequences",
  theory: `
    <h2>Escape Sequences</h2>
    <p>Some characters can't be typed directly inside a string, so C uses <strong>escape sequences</strong>: a backslash followed by a letter.</p>
    <h3>Common ones</h3>
    <ul>
      <li><code>\\n</code> - new line</li>
      <li><code>\\t</code> - tab</li>
      <li><code>\\"</code> - a literal double quote</li>
    </ul>
    <pre>printf("Line one\\nLine two");</pre>
    <p>That prints on two lines, because <code>\\n</code> moves the cursor down to the next one.</p>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Make the program print <strong>two separate lines</strong> by adding a <code>\\n</code> in the middle of the text.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Line oneLine two");\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('\\n')) return "Add a \\n escape sequence to create a new line.";
    if (!src.includes('printf')) return "Keep the printf() line.";
    return true;
  }
};
