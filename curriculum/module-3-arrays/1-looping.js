/* curriculum/module-3-arrays/1-looping.js */
export default {
  title: "Looping over Arrays",
  theory: `
    <h2>Looping over Arrays</h2>
    <p>To visit every element, use a loop with a counter. A <code>for</code> loop is the natural fit: it sets a start, a condition, and a step all on one line.</p>
    <pre>int data[3] = {10, 20, 30};

for (int i = 0; i &lt; 3; i++) {
    printf("%d\\n", data[i]);
}</pre>
    <ul>
      <li><code>i</code> goes 0, 1, 2 and stops before 3.</li>
      <li><code>data[i]</code> reads the element at the current index.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Write a <code>for</code> loop that prints every element of <code>data</code> using <code>data[i]</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int data[3] = {10, 20, 30};\n    // loop over the array below\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('for')) return "Use a for loop.";
    if (!src.includes('[i]')) return "Access each element with data[i].";
    if (!src.includes('printf')) return "Print each element with printf.";
    return true;
  }
};
