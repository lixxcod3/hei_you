/* curriculum/module-4-structs/0-defining-struct.js */
export default {
  title: "Defining and Using a struct",
  theory: `
    <h2>Defining and Using a struct</h2>
    <p>A <strong>struct</strong> groups related variables (of possibly different types) into one new type. Reach each <strong>field</strong> with a dot <code>.</code>.</p>
    <pre>struct Point {
    int x;
    int y;
};

struct Point p;
p.x = 3;
p.y = 5;
printf("%d, %d", p.x, p.y);  // 3, 5</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>A <code>struct Point</code> with fields <code>x</code> and <code>y</code> is defined for you. Create one called <code>p</code> and set <code>p.x</code> to <code>3</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    // create a Point and set its x field\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('struct Point p')) return "Create a Point with: struct Point p;";
    if (!src.includes('p.x')) return "Set the x field with p.x.";
    if (!src.includes('3')) return "Set p.x to 3.";
    return true;
  }
};
