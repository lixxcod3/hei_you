/* curriculum/module-1-variables/1-data-types.js */
export default {
  title: "Core Data Types",
  theory: `
    <h2>Core Data Types</h2>
    <p>The type of a variable decides what it can hold and how much memory it uses.</p>
    <h3>The essentials</h3>
    <ul>
      <li><code>int</code> - whole numbers: <code>42</code></li>
      <li><code>float</code> - decimals: <code>3.14</code></li>
      <li><code>double</code> - bigger, more precise decimals</li>
      <li><code>char</code> - one character in single quotes: <code>'A'</code></li>
    </ul>
    <pre>int    lives = 3;
float  pi    = 3.14;
char   grade = 'A';</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Declare a <code>float</code> called <code>pi</code> set to <code>3.14</code>, and a <code>char</code> called <code>grade</code> set to <code>'A'</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    // declare the two variables here\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('float') || !src.includes('3.14')) return "Declare a float pi = 3.14;";
    if (!src.includes('char') || !src.includes("'A'")) return "Declare a char grade = 'A';";
    return true;
  }
};
