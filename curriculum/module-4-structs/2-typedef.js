/* curriculum/module-4-structs/2-typedef.js */
export default {
  title: "typedef for Cleaner Code",
  theory: `
    <h2>typedef for Cleaner Code</h2>
    <p>Writing <code>struct Point</code> everywhere gets noisy. <code>typedef</code> gives a type a shorter alias so you can drop the <code>struct</code> keyword.</p>
    <pre>typedef struct {
    int x;
    int y;
} Point;          // "Point" is now a type

Point p;          // no "struct" needed
p.x = 7;</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>The <code>Point</code> type is already <code>typedef</code>'d. Declare a variable <code>p</code> and set <code>p.x</code> to <code>7</code> - notice you don't write <code>struct</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nint main(void) {\n    // declare a Point and set its x field\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('Point p')) return "Declare a Point called p (no 'struct' needed).";
    if (!src.includes('p.x')) return "Set the x field with p.x.";
    if (!src.includes('7')) return "Set p.x to 7.";
    return true;
  }
};
