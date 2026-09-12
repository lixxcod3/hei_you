/* curriculum/module-1-variables/0-declaring.js */
export default {
  title: "Declaring & Initialising Variables",
  theory: `
    <h2>Declaring &amp; Initialising Variables</h2>
    <p>A variable is a named box in memory. Before you can use one, you must <strong>declare</strong> it: state its type and name. You can also <strong>initialise</strong> it - give it a starting value on the same line.</p>
    <h3>The pattern</h3>
    <pre>int count;          // declare (no value yet)
count = 5;          // assign later

int score = 100;    // declare + initialise together</pre>
    <ul>
      <li>Names are case-sensitive: <code>age</code> and <code>Age</code> differ.</li>
      <li>Use meaningful names - <code>total</code>, not <code>t</code>.</li>
    </ul>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Declare an integer called <code>age</code> and initialise it to <code>20</code> on a single line.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    // declare the variable here\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('int age')) return "Declare an integer named age (int age).";
    if (!src.includes('20')) return "Initialise age to 20.";
    if (!src.includes('=')) return "Use = to assign the value.";
    return true;
  }
};
