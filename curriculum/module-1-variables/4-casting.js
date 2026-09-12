/* curriculum/module-1-variables/4-casting.js */
export default {
  title: "Type Conversion & Casting",
  theory: `
    <h2>Type Conversion &amp; Casting</h2>
    <p>C sometimes converts between types automatically, but integer division can surprise you: <code>7 / 2</code> is <code>3</code>, not <code>3.5</code>, because both sides are <code>int</code>.</p>
    <h3>Forcing a type with a cast</h3>
    <p>Put the target type in parentheses before a value to convert it:</p>
    <pre>int a = 7, b = 2;
float result = (float)a / b;   // 3.5, not 3</pre>
    <p>Casting <code>a</code> to <code>float</code> makes the whole division use decimals.</p>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Divide <code>a</code> by <code>b</code> as decimals by casting one side with <code>(float)</code>, storing the answer in <code>result</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int a = 7, b = 2;\n    float result;\n    // cast one side and divide below\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('(float)') && !src.includes('(double)')) return "Use a cast like (float) to convert before dividing.";
    if (!src.includes('result')) return "Store the answer in result.";
    if (!src.includes('/')) return "Use / to divide a by b.";
    return true;
  }
};
