/* curriculum/module-3-arrays/2-arrays-and-pointers.js */
export default {
  title: "How Arrays Relate to Pointers",
  theory: `
    <h2>How Arrays Relate to Pointers</h2>
    <p>An array's name is really the <strong>address of its first element</strong>. That means you can aim a pointer straight at an array with no <code>&amp;</code>:</p>
    <pre>int data[3] = {10, 20, 30};
int *p = data;        // same as &amp;data[0]

printf("%d", *p);         // 10
printf("%d", *(p + 1));   // 20
printf("%d", p[1]);       // 20 - arrays and pointers index the same way</pre>
    <p>This is why passing an array to a function really passes a pointer.</p>
    <div class="task-box dont-print">
      <h3>Your Task</h3>
      <p>Aim <code>p</code> at <code>data</code> (no <code>&amp;</code> needed) and print the first element with <code>*p</code>.</p>
    </div>
  `,
  starter: `#include <stdio.h>\n\nint main(void) {\n    int data[3] = {10, 20, 30};\n    // aim a pointer at the array and read the first value\n\n    return 0;\n}`,
  validate(src) {
    if (!src.includes('*p')) return "Declare a pointer p (int *p).";
    if (!src.includes('= data')) return "Aim p at the array with p = data.";
    return true;
  }
};
