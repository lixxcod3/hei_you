/* curriculum/module-1-variables/2-scanf.js */
export default {
  title: "Reading Input with scanf()",
  theory: `
    <h2>Reading Input with scanf()</h2>
    <p><code>printf</code> sends data out; <code>scanf</code> reads data in from the user. It needs two things: a format specifier, and the <strong>address</strong> of the variable to fill - that's the <code>&amp;</code>.</p>
    <pre>int age;
printf("Enter your age: ");
scanf("%d", &amp;age);   // read an int into age</pre>
    <ul>
      <li><code>%d</code> reads an int, <code>%f</code> a float, <code>%c</code> a char.</li>
      <li>The <code>&amp;</code> before the variable is required - it tells scanf <em>where</em> to store the value.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Read an integer into <code>x</code> using <code>scanf</code> with <code>"%d"</code> and <code>&amp;x</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int x;\n    // read an integer into x below\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('scanf')) return "Use scanf() to read input.";
    if (!src.includes('%d')) return "Use the %d specifier to read an integer.";
    if (!src.includes('&x')) return "Pass the address of x with &x.";
    return true;
  }
};
