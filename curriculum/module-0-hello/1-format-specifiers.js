/* curriculum/module-0-hello/1-format-specifiers.js */
export default {
  title: "Format Specifiers",
  theory: `
    <h2>Format Specifiers</h2>
    <p>C uses format specifiers like <code>%d</code> to print integers. This is crucial when outputting mathematical calculations.</p>
    <pre>int sum = 10 + 5;\nprintf("Total: %d", sum);</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Declare <code>int x = 42;</code> and print it using the <code>%d</code> format specifier.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    // Declare int x here\n    \n    // Print x here\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('int x') || !src.includes('42')) return "Error: Make sure to declare 'int x = 42;'";
    if (!src.includes('%d') || !src.includes('x')) return "Error: Use printf with '%d' to print variable x";
    return true;
  }
};
