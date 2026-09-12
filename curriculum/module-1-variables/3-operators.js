/* curriculum/module-1-variables/3-operators.js */
export default {
  title: "Arithmetic & Assignment Operators",
  theory: `
    <h2>Arithmetic &amp; Assignment Operators</h2>
    <p>C does maths with the operators you'd expect, plus a few handy shortcuts.</p>
    <h3>Arithmetic</h3>
    <ul>
      <li><code>+  -  *  /</code> - add, subtract, multiply, divide</li>
      <li><code>%</code> - remainder (modulo): <code>7 % 3</code> is <code>1</code></li>
    </ul>
    <h3>Assignment shortcuts</h3>
    <pre>int total = 0;
total = total + 5;   // long way
total += 5;          // same thing, shorter
total++;             // add 1</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Given <code>a</code> and <code>b</code>, add them together and store the result in a variable called <code>sum</code> (use <code>a + b</code>).</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int a = 8, b = 5;\n    // add the two numbers below\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('sum')) return "Store the result in a variable called sum.";
    if (!src.includes('a + b') && !src.includes('a+b')) return "Add a and b together (a + b).";
    return true;
  }
};
