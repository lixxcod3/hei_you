/* curriculum/module-4-structs/1-arrays-of-structs.js */
export default {
  title: "Arrays of Structs",
  theory: `
    <h2>Arrays of Structs</h2>
    <p>You can store many structs in an array - a common way to hold a list of records. Combine array indexing with the dot operator.</p>
    <pre>struct Point pts[2];

pts[0].x = 1;
pts[0].y = 2;
pts[1].x = 3;
pts[1].y = 4;

printf("%d", pts[1].x);  // 3</pre>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Make an array <code>pts</code> of <code>2</code> Points, then set <code>pts[0].x</code> to <code>1</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    // make the array and set the first point's x\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('pts[2]')) return "Declare an array of 2 Points: struct Point pts[2];";
    if (!src.includes('pts[0].x')) return "Set the first point's x with pts[0].x.";
    return true;
  }
};
