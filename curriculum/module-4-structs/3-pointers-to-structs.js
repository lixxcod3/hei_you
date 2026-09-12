/* curriculum/module-4-structs/3-pointers-to-structs.js */
export default {
  title: "Pointers to Structs & the Arrow",
  theory: `
    <h2>Pointers to Structs &amp; the -&gt; Operator</h2>
    <p>When you have a <em>pointer</em> to a struct, use the arrow <code>-&gt;</code> instead of the dot to reach fields. <code>p-&gt;x</code> is shorthand for <code>(*p).x</code>.</p>
    <pre>Point pt = {0, 0};
Point *p = &amp;pt;

p-&gt;x = 5;            // same as (*p).x = 5
printf("%d", p-&gt;x);  // 5</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>A pointer <code>p</code> points to <code>pt</code>. Set its <code>x</code> field to <code>5</code> using the arrow operator <code>p-&gt;x</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nint main(void) {\n    Point pt = {0, 0};\n    Point *p = &pt;\n    // set the x field using the arrow operator\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('p->x')) return "Use the arrow operator: p->x.";
    if (!src.includes('5')) return "Set p->x to 5.";
    return true;
  }
};
