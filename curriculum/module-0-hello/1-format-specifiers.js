/* curriculum/module-0-hello/1-format-specifiers.js */
export default {
  title: "Format Specifiers",
  theory: `
    <h2>Format Specifiers</h2>
    <p>Often you don't want to print fixed text — you want to print the <em>value</em> of a variable. C does this with <strong>format specifiers</strong>: placeholders inside the string that <code>printf</code> fills in.</p>

    <h3>The common specifiers</h3>
    <ul>
      <li><code>%d</code> — an integer (<code>int</code>)</li>
      <li><code>%f</code> — a floating-point number (<code>float</code> / <code>double</code>)</li>
      <li><code>%c</code> — a single character (<code>char</code>)</li>
      <li><code>%s</code> — a string of text</li>
    </ul>

    <h3>How it works</h3>
    <p>Put the placeholder in the text, then pass the value after the string. They match up left to right.</p>
    <pre>int sum = 10 + 5;
printf("Total: %d", sum);   // prints: Total: 15</pre>
    <p>The <code>%d</code> is replaced by whatever <code>sum</code> holds when the line runs.</p>

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
