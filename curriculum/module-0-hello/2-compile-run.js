/* curriculum/module-0-hello/2-compile-run.js */
export default {
  title: "Compiling and Running",
  theory: `
    <h2>Compiling and Running</h2>
    <p>Writing code is only half the job - the computer can't run C directly. A <strong>compiler</strong> first translates your source into machine instructions. Here, pressing <strong>Compile &amp; Run</strong> does that in the browser and shows the result in the console on the right.</p>
    <h3>The cycle</h3>
    <ul>
      <li>Write or edit your code.</li>
      <li>Press <strong>Compile &amp; Run</strong>.</li>
      <li>Read the output - a green success line, or a red error to fix.</li>
      <li>Fix and repeat. This loop is the heart of programming.</li>
    </ul>
    <p>A program that compiles cleanly and finishes tidily returns <code>0</code> from <code>main</code>.</p>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>This program won't compile - there's a typo in the return line. Fix it to read <code>return 0;</code> and run it.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Compiling C!");\n    retunr 0;\n}`,
  validate(src) {
    if (src.includes('retunr')) return "There's still a typo - it should be 'return', not 'retunr'.";
    if (!src.includes('return 0;')) return "Make main end with 'return 0;'.";
    return true;
  }
};
